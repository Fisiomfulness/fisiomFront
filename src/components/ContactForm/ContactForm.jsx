"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "@/utils/validations/contactSchema";
import { formikZodValidator } from "@/utils/validations";
import Image from "next/image";

const ContactForm = () => {
  const handleSubmit = (values) => {
    const mensaje =
      `Nombre: ${values.nombre}%0A` +
      `Departamento: ${values.departamento}%0A` +
      `Distrito: ${values.distrito}%0A` +
      `Celular: ${values.celular}%0A` +
      `Email: ${values.email}%0A` +
      `Descripción del dolor: ${values.descripcion || "N/A"}`;

    window.open(`https://wa.me/51901294627?text=${mensaje}`, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+51901294627";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Chatea con un fisioterapeuta
      </h1>
      <Formik
        initialValues={{
          nombre: "",
          departamento: "",
          distrito: "",
          celular: "",
          email: "",
          descripcion: "",
          acceptTerms: false,
        }}
        onSubmit={handleSubmit}
        validate={formikZodValidator(contactSchema)}
      >
        {() => (
          <Form className="w-full max-w-md sm:max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <Field
                type="text"
                name="nombre"
                placeholder="¿Cuál es tu Nombre?*"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="departamento"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecciona Departamento*</option>
                <option value="Amazonas">Amazonas</option>
                <option value="Ancash">Ancash</option>
                <option value="Apurímac">Apurímac</option>
                <option value="Arequipa">Arequipa</option>
                <option value="Ayacucho">Ayacucho</option>
                <option value="Cajamarca">Cajamarca</option>
                <option value="Cusco">Cusco</option>
                <option value="Huancavelica">Huancavelica</option>
                <option value="Huánuco">Huánuco</option>
                <option value="Ica">Ica</option>
                <option value="Junín">Junín</option>
                <option value="La Libertad">La Libertad</option>
                <option value="Lambayeque">Lambayeque</option>
                <option value="Lima">Lima</option>
                <option value="Loreto">Loreto</option>
                <option value="Madre de Dios">Madre de Dios</option>
                <option value="Moquegua">Moquegua</option>
                <option value="Pasco">Pasco</option>
                <option value="Piura">Piura</option>
                <option value="Puno">Puno</option>
                <option value="San Martín">San Martín</option>
                <option value="Tacna">Tacna</option>
                <option value="Tumbes">Tumbes</option>
                <option value="Ucayali">Ucayali</option>
              </Field>
              <ErrorMessage
                name="departamento"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="distrito"
                placeholder="Distrito*"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="distrito"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="celular"
                placeholder="Celular con WhatsApp*"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="celular"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                as="textarea"
                name="descripcion"
                placeholder="Describe tu dolor (opcional)"
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="descripcion"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4 flex items-center">
              <Field type="checkbox" name="acceptTerms" className="mr-2" />
              <span>
                He leído y acepto la{" "}
                <a
                  href="/politica-privacidad"
                  className="text-green-500 underline"
                >
                  Política de Privacidad
                </a>
              </span>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="text-sm text-gray-400 mb-4">
              * No compartimos su información personal con nadie. Consulte
              nuestra{" "}
              <a
                href="/politica-privacidad"
                className="text-green-500 underline"
              >
                Política de Privacidad
              </a>{" "}
              para obtener más información.
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Chatear
            </button>
          </Form>
        )}
      </Formik>
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
