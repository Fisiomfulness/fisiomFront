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

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.professionals, {
        signal: abortController.signal,
        params: {},
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
  }, []);

  return (
    <div className="flex flex-col w-full m-4">
      <SearchProfesional
        profesionales={professionals}
        setProfesionalesFiltrados={setProfessionals}
      />
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
