"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import ServicioMainContainer from "./ServicioMainContainer";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import dynamic from "next/dynamic";
import { apiEndpoints } from "@/api_endpoints";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const markers = [
  { position: [51.505, -0.09], popup: "Profesional 1" },
  { position: [51.504, -0.06], popup: "Profesional 2" },
  { position: [51.5, -0.11], popup: "Profesional 3" },
];

const ServicioMain = ({ data }) => {
  const [professionals, setProfessionals] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    specialtyId: "", // TODO: Add specialty filter
  });

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.professionals, {
        signal: abortController.signal,
        params: {
          search: filters.search,
          specialtyId: filters.specialtyId,
        },
      })
      .then(({ data }) => {
        setProfessionals(data.professionals);
        //setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, [filters]);

  return (
    <div className="flex flex-col w-full m-4">
      <SearchProfesional filters={filters} setFilters={setFilters} />
      <div className="flex w-full min-h-min">
        <ServicioMainContainer profesionales={professionals} />
        <div className="min-h-[900px] w-full">
          <Map markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default ServicioMain;
