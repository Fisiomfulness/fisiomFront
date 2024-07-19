"use client";

import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";
import { useEffect, useRef, useState } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import { useInView } from "framer-motion";
import Loader from "../Loader";
import SearchUsers from "./SearchUser";
import UsersContainer from "./UsersContainer";
// atom
import { useAtom } from "jotai";
import { filtersAtom } from "./store/comunidad";
// load map with dynamic so it doesn't break SSR
import dynamic from "next/dynamic";
const CustomMap = dynamic(() => import("@/components/CustomMap/CustomMap"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ComunidadClient = () => {
  // ref for loading more results
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  // state
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [toggle, setToggle] = useState(false);

  const location = useGeolocation();

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    axios
      .get(apiEndpoints.users, {
        signal: abortController.signal,
        params: {
          search: filters.search,
          interests: filters.interestsId.join(","),
          position: location.user.join(","),
          page: filters.page,
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        if (filters.page === 1) {
          setUsers(data.users);
          setToggle((prev) => !prev);
        } else {
          setUsers((prev) => {
            const usersMap = new Map([...prev].map((item) => [item._id, item]));
            data.users.forEach((user) => {
              if (!usersMap.has(user._id)) {
                usersMap.set(user._id, user);
              }
            });
            return Array.from(usersMap.values());
          });
        }
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      })
      .finally(setLoading(false));

    return () => abortController.abort();
  }, [filters, location]);

  useEffect(() => {
    isInView &&
      filters.page < totalPages &&
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isInView]);

  return (
    <main className="relative max-w-8xl mx-auto w-full mb-5 hstack gap-5 px-auto">
      <div className="w-full flex flex-col items-center md:w-1/2">
        <SearchUsers />
        <div className="w-full flex flex-col items-center h-[80vh] overflow-y-auto overflow-x-hidden mt-10">
          <UsersContainer users={users} />
          <div ref={ref} className="h-full min-h-1">
            {loading && <Loader />}
          </div>
        </div>
      </div>
      <div className="hidden md:w-1/2 md:flex">
        <CustomMap markers={users} setMarkers={setUsers} toggle={toggle} />
      </div>
    </main>
  );
};

export default ComunidadClient;
