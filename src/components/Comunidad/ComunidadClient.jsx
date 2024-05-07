"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SearchUsers from "./SearchUser";
import UsersContainer from "./UsersContainer";
import { useInView } from "framer-motion";
import { apiEndpoints } from "@/api_endpoints";
import useGeolocation from "@/hooks/useGeolocation";
import dynamic from "next/dynamic";
import Loader from "../Loader";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ComunidadClient = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  const userCoords = useGeolocation({
    defaultLocation: [-12.057822374374036, -77.06708360541617],
  });

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
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "CanceledError") return;
          setLoading(false);
          throw err;
        });
    }
    return () => abortController.abort();
  }, [page, filters, userCoords]);

  useEffect(() => {
    isInView && page < totalPages && setPage((prev) => prev + 1);
  }, [isInView]);

  return (
    <main className="max-w-8xl mx-auto w-full mb-10 hstack gap-5 px-auto">
      <div className="w-full flex flex-col items-center gap-10 md:w-1/2">
        <SearchUsers
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <div className="w-full flex flex-col items-center gap-10 h-[80vh] overflow-y-auto overflow-x-hidden">
          {(users.length || !loading) && <UsersContainer users={users} />}
          <div ref={ref} className="h-full">
            {loading && <Loader />}
          </div>
        </div>
      </div>
      <div className="hidden md:w-1/2 md:flex">
        <Map users={users} userCoords={userCoords} />
      </div>
    </main>
  );
};

export default ComunidadClient;
