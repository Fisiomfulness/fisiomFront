"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import useGeolocation from "@/hooks/useGeolocation";
import ServicioMainContainer from "./ServicioMainContainer";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import dynamic from "next/dynamic";
import { apiEndpoints } from "@/api_endpoints";
import Paginate from "../Paginate/Paginate";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const ServicioMain = () => {
  const userCoords = useGeolocation({
    defaultLocation: [-12.057822374374036, -77.06708360541617],
  });
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
      axios
        .get(apiEndpoints.professionals, {
          signal: abortController.signal,
          params: {
            search: filters.search,
            specialtyId: filters.specialtyId,
            pos: userCoords.join(","),
            page: page,
          },
        })
        .then(({ data }) => {
          setProfessionals(data.professionals);
          setTotalPages(data.totalPages);
        })
        .catch((err) => {
          if (err.name === "CanceledError") return;
          throw err;
        });
    }
    return () => abortController.abort();
  }, [filters, page, userCoords]);

  return (
    <main className="vstack px-auto mx-auto max-w-8xl w-full mb-4">
      <SearchProfesional
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
      />
      <div className="flex w-full min-h-min justify-between">
        <div className="w-full flex flex-col gap-2 items-center">
          <ServicioMainContainer profesionales={professionals} />
          <div className="mt-auto">
            <Paginate page={page} setPage={setPage} total={totalPages} />
          </div>
        </div>
        <div className="min-h-[900px] w-full">
          <Map profesionales={professionals} userCoords={userCoords} />
        </div>
      </div>
    </main>
  );
};

export default ServicioMain;
