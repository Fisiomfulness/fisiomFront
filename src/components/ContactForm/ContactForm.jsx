"use client";
import React, { useState } from "react";
import Image from "next/image";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    departamento: "",
    distrito: "",
    celular: "",
    email: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje =
      `Nombre: ${formData.nombre}%0A` +
      `Departamento: ${formData.departamento}%0A` +
      `Distrito: ${formData.distrito}%0A` +
      `Celular: ${formData.celular}%0A` +
      `Email: ${formData.email}%0A` +
      `Descripción del dolor: ${formData.descripcion}`;

    window.open(`https://wa.me/1234567890?text=${mensaje}`, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Chatea con un fisioterapeuta
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="text"
            name="nombre"
            placeholder="¿Cuál es tu Nombre?*"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <select
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona Departamento*</option>
            {/* faltan las opciones de departamento */}
            <option value="Lima">Lima</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="distrito"
            placeholder="Distrito*"
            value={formData.distrito}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="celular"
            placeholder="Celular con WhatsApp*"
            value={formData.celular}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="descripcion"
            placeholder="Describe tu dolor (opcional)"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <input type="checkbox" required className="mr-2" />
          <span>
            He leído y acepto la{" "}
            <a href="/politica-privacidad" className="text-green-500 underline">
              Política de Privacidad
            </a>
          </span>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Chatear
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="mb-4">
          O podrías llamarnos haciendo directamente click aquí
        </p>
        <button onClick={handleCallClick} className="hover:opacity-80">
          <Image src="/call-icon.png" alt="Llamar" width={48} height={48} />
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
