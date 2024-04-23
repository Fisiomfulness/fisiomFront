"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ServicioDetallesCommentBox from "@/components/Servicios/ServicioDetallesCommentBox";
import ServicioProfesionalCard from "@/components/Servicios/ServicioProfesionalCard";
import ServicioProfesionalComentarios from "@/components/Servicios/ServicioProfesionalComentarios";
import { apiEndpoints } from "@/api_endpoints";

const ServicioDetalles = ({ params }) => {
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
    <div>
      <ServicioProfesionalCard profesional={profesional} />
      <ServicioDetallesCommentBox profesional={profesional} />
      <ServicioProfesionalComentarios comentarios={profesional.profesionalScore} />
    </div>
  );
};

export default ServicioDetalles;
