"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import ServicioMainContainer from "./ServicioMainContainer";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import dynamic from "next/dynamic";
import { apiEndpoints } from "@/api_endpoints";
import Paginate from "../Paginate/Paginate";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const markers = [
  { position: [51.505, -0.09], popup: "Profesional 1" },
  { position: [51.504, -0.06], popup: "Profesional 2" },
  { position: [51.5, -0.11], popup: "Profesional 3" },
];

const ServicioMain = () => {
  const [professionals, setProfessionals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    specialtyId: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.professionals, {
        signal: abortController.signal,
        params: {
          search: filters.search,
          specialtyId: filters.specialtyId,
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
    return () => abortController.abort();
  }, [filters, page]);

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
          <Map markers={markers} profesionales={professionals} />
        </div>
      </div>
    </main>
  );
};

export default ServicioMain;
