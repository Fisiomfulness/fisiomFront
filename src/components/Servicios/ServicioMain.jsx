"use client";
import { useState } from "react";
import ServicioMainContainer from "./ServicioMainContainer";
import SearchProfesional from "./SearchProfesional/SearchProfesional";
import dynamic from "next/dynamic";

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
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([
    ...data,
  ]);

  return (
    <div className="flex flex-col w-full m-4">
      <SearchProfesional
        profesionales={data}
        setProfesionalesFiltrados={setProfesionalesFiltrados}
      />
      <div className="flex w-full min-h-min">
        <ServicioMainContainer profesionales={profesionalesFiltrados} />
      <div className="min-h-[900px] w-full">
        <Map markers={markers} />

      </div>
      </div>
    </div>
  );
};

export default ServicioMain;
