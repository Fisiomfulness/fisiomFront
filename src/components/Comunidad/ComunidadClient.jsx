"use client";

import { apiEndpoints } from "@/api_endpoints";
import useGeolocation from "@/hooks/useGeolocation";
import axios from "axios";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import SearchUsers from "./SearchUser";
import UsersContainer from "./UsersContainer";

const CustomMap = dynamic(() => import("@/components/CustomMap/CustomMap"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ComunidadClient = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  // load user location when it changes if it's allowed
  const userCoords = useGeolocation({});

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    interests: new Set([]),
    pos: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    if (userCoords[0] !== 0) {
      setLoading(true);
      axios
        .get(apiEndpoints.users, {
          signal: abortController.signal,
          params: {
            search: filters.search,
            interests: Array.from(filters.interests).join(","),
            pos: userCoords.join(","),
            page: page,
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (page === 1) {
            setUsers(data.users);
          } else {
            setUsers((prev) => [...prev, ...data.users]);
          }
          setTotalPages(data.totalPages);
        })
        .catch((err) => {
          if (err.name === "CanceledError") return;

          throw err;
        })
        .finally(setLoading(false));
    }
    return () => abortController.abort();
  }, [page, filters, userCoords]);

  useEffect(() => {
    isInView && page < totalPages && setPage((prev) => prev + 1);
  }, [isInView]);

  return (
    <main className="relative max-w-8xl mx-auto w-full mb-10 hstack gap-5 px-auto">
      {loading ? (
        <div
          ref={ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col items-center gap-10 md:w-1/2">
            <SearchUsers
              filters={filters}
              setFilters={setFilters}
              setPage={setPage}
            />
            <div className="w-full flex flex-col items-center gap-10 h-[80vh] overflow-y-auto overflow-x-hidden">
              <UsersContainer users={users} />
            </div>
          </div>
          <div className="hidden md:w-1/2 md:flex">
            <CustomMap markers={users} setMarkers={setUsers} />
          </div>
        </>
      )}
    </main>
  );
};

export default ComunidadClient;
