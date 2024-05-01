"use client";
import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";
import { useState, useEffect } from "react";
import ProfessionalComment from "./ProfessionalComment";

const ServicioProfesionalComentarios = ({ profesionalId }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.professionalScore + profesionalId, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setComentarios(data.findProfesional.professionalScore);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, [profesionalId]);

  return (
    <div className="m-2 flex flex-col gap-2">
      {comentarios?.map((comentario) => (
        <ProfessionalComment key={comentario._id} comment={comentario} />
      ))}
    </div>
  );
};

export default ServicioProfesionalComentarios;
