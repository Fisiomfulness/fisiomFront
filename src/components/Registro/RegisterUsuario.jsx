"use client";

import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { CustomButton, CustomInput } from "@/features/ui";
import { registerUserForm } from "@/services/register";
import { actualMinDate } from "@/utils/helpers";
import { useDropzone } from "react-dropzone";
import { Button, Select, SelectItem } from "@nextui-org/react";

//#region Formik config
const initialValues = {
  name: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  password: "",
  repitPass: "",
  gender: "Masculino",
};

const registerSchemaValidation = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: Yup.string().required("Numero telefonico requerido"),
  email: Yup.string()
    .required("Correo electronico requerido")
    .email("No es un email"),
  dateOfBirth: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .max(actualMinDate(), "Debes ser mayor de 18 años"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  repitPass: Yup.string()
    .required("Requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
});

//#region Component
function RegistroUsuario({ Condicions }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const registerResponse = async (values) => {
    await registerUserForm(values);
  };

  const handleSubmit = (values) => {
    //se fija si las propiedaes del objeto del estado formdata estan vacias
    if (Condicions()) {
      registerResponse(values);
    } else {
      toast.error("Porfavor acepte los terminos y condiciones");
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={registerSchemaValidation}
    >
      {(values, handleChange) => (
        <Form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="name"
              type="String"
              placeholder="Nombre"
            />
            <ErrorMessage
              name="name"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="phone"
              type="string"
              placeholder="Telefono"
            />
            <ErrorMessage
              name="phone"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="email"
              type="email"
              placeholder="email"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="dateOfBirth"
              type="date"
              placeholder="Fecha de nacimiento"
            />
            <ErrorMessage
              name="dateOfBirth"
              component="span"
              className="text-danger-500"
            />
          </div>

          <Select
            placeholder="Seleccione un genero"
            onChange={handleChange}
            name="gender"
            aria-labelledby="gender" // Add this line
          >
            <SelectItem value="Masculino" label="Masculino">
              Masculino
            </SelectItem>

            <SelectItem value="Femenino" label="Femenino">
              Femenino
            </SelectItem>

            <SelectItem
              value="Prefiero no responder"
              label="Prefiero no responder"
            >
              Prefiero no responder
            </SelectItem>
          </Select>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="password"
              type="password"
              placeholder="contraseña"
            />
            <ErrorMessage
              name="password"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="repitPass"
              type="password"
              placeholder="Repita la contraseña"
            />
            <ErrorMessage
              name="repitPass"
              component="span"
              className="text-danger-500"
            />
          </div>

          <Button className="bg-primary-500 text-white font-sans" type="submit">
            Registrarse
          </Button>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p>¿Ya esta registrado?</p>
            <Button
              className="bg-primary-500 text-white font-sans"
              as={Link}
              href="/login"
            >
              Ingresar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegistroUsuario;
