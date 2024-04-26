"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiEndpoints } from "@/api_endpoints";
import ServicioExperienciaCard from "@/components/Servicios/ServicioExperienciaCard";

const ServicioExperiencia = ({ params }) => {
  const profesionalId = params.detallesId;
  const [profesional, setProfesional] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.professionalsDetail + profesionalId, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setProfesional(data.professional);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, [profesionalId]);

  return (
    <div className="w-full">
      <ServicioExperienciaCard experiencia={profesional.experience} />
    </div>
  );
};

export default ServicioExperiencia;
