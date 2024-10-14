'use client'; 

import { useState, useEffect } from 'react';
import { getPendingProfessionals, acceptProfessional } from '../../../services/professionals';

export default function PendingProfessionals() {
  const [pendingProfessionals, setPendingProfessionals] = useState([]);

  useEffect(() => {
    fetchPendingProfessionals();
  }, []);

  const fetchPendingProfessionals = async () => {
    const { data, error } = await getPendingProfessionals();
    if (!error) {
      // Verifica si data es un array
      setPendingProfessionals(Array.isArray(data) ? data : []);
    } else {
      console.error("Error al obtener profesionales pendientes: ", error);
    }
  };

  const handleApprove = async (professionalId) => {
    const { data, error } = await acceptProfessional(professionalId);
    if (!error) {
      fetchPendingProfessionals(); 
    } else {
      console.error("Error al aprobar profesional: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Profesionales Pendientes de Aprobación</h1>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pendingProfessionals.map(professional => (
            <tr key={professional._id}>
              <td>{professional.name}</td>
              <td>{professional.email}</td>
              <td>{professional.isApproved ? 'Aceptado' : 'Pendiente'}</td>
              <td>
                {!professional.isApproved && (
                  <button 
                    onClick={() => handleApprove(professional._id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Aceptar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
