"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import ServicioMainContainer from "./ServicioMainContainer";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import dynamic from "next/dynamic";
import { apiEndpoints } from "@/api_endpoints";
import { useInView } from "framer-motion";
import Loader from "../Loader";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ServicioMain = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  const userCoords = useGeolocation({
    defaultLocation: [-12.057822374374036, -77.06708360541617],
  });
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    specialtyId: "",
    pos: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    if (userCoords[0] !== 0) {
      setLoading(true);
      axios
        .get(apiEndpoints.professionals, {
          signal: abortController.signal,
          params: {
            search: filters.search,
            specialtyId: filters.specialtyId,
            pos: userCoords.join(","),
            page: page,
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (page === 1) {
            setProfessionals(data.professionals);
          } else {
            setProfessionals((prev) => [...prev, ...data.professionals]);
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
    <main className="vstack px-auto mx-auto max-w-8xl w-full mb-4">
      <SearchProfesional
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />
      <div className="flex w-full min-h-min justify-between gap-4">
        <div className="w-1/2 flex flex-col gap-2 items-center h-[80vh] overflow-y-auto overflow-x-hidden">
          {(professionals.length || !loading) && (
            <ServicioMainContainer profesionales={professionals} />
          )}
          <div ref={ref} className="h-full">
            {loading && <Loader />}
          </div>
        </div>
        <div className="min-h-[80vh] w-1/2">
          <Map professionals={professionals} userCoords={userCoords} />
        </div>
      </div>
    </main>
  );
};

export default ServicioMain;
