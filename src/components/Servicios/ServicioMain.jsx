"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { filtersAtom, locationAtom } from "./store/servicios";
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

  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [locations, setLocations] = useAtom(locationAtom);

  const userCoords = useGeolocation({});
  useEffect(() => {
    if (userCoords[0] !== 0) {
      setLocations((prev) => ({ ...prev, user: userCoords }));
      if (locations.mapCenter[0] === 0) {
        setLocations((prev) => ({ ...prev, mapCenter: userCoords }));
      }
    }
  }, [userCoords]);

  useEffect(() => {
    const abortController = new AbortController();
    if (locations.mapCenter[0] !== 0) {
      setLoading(true);
      axios
        .get(apiEndpoints.professionals, {
          signal: abortController.signal,
          params: {
            search: filters.search,
            specialtyId: filters.specialtyId,
            pos: locations.mapCenter.join(","),
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
        })
        .finally(setLoading(false));
    }
    return () => abortController.abort();
  }, [page, filters, locations]);

  useEffect(() => {
    isInView && page < totalPages && setPage((prev) => prev + 1);
  }, [isInView]);

  return (
    <main className="vstack px-auto mx-auto max-w-8xl w-full flex flex-col py-4 gap-4">
      <SearchProfesional setPage={setPage} />
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 items-center size-full h-[80vh] overflow-y-auto overflow-x-hidden">
          {(professionals.length || !loading) && (
            <ServicioMainContainer profesionales={professionals} />
          )}
          <div ref={ref} className="h-full min-h-1">
            {loading && <Loader />}
          </div>
        </div>
        <div className="min-h-[80vh] w-full">
          <Map professionals={professionals} />
        </div>
      </div>
    </main>
  );
};

export default ServicioMain;
