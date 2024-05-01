"use client";

import React, { useState, useCallback } from "react";
import { CustomButton, CustomTable } from "@/features/ui";
import toast from "react-hot-toast";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, SelectItem, Select } from "@nextui-org/react";

import { actualMinDate } from "@/utils/helpers";
import { useDropzone } from "react-dropzone";

import { registerProfesionalForm } from "@/services/register";
import { Label } from "react-aria-components";

//#region Formik config
const initialValues = {
  name: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "Masculino",
  password: "",
  repitPass: "",
  license: "",
  city: "",
};

const yupRequired = Yup.string().required("requerido");

const registerSchemaValidation = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: yupRequired,
  email: yupRequired.email("No es un email"),
  dateOfBirth: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .max(actualMinDate(), "Debes ser mayor de 18 años"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  repitPass: Yup.string()
    .required("Requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
  license: yupRequired,
  city: yupRequired,
});

const genderArray = [
  { label: "Femenino", value: "Femenino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Prefiero no responder", value: "Prefiero no responder" },
];

//#region Component
function RegisterProfesional({ Condicions }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const registerResponse = async (values) => {
    let { repitPass, ...newValues } = values;
    const newformData = new FormData();

    for (const [key, value] of Object.entries(newValues)) {
      newformData.append(key, value);
    }
    newformData.append("curriculum", acceptedFiles[0]);

    await registerProfesionalForm(newformData);
  };

  const handleSubmitRegister = (values) => {
    if (Condicions()) {
      registerResponse(values);
    } else {
      toast.error("Acepte las condiciones");
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitRegister}
      initialValues={initialValues}
      validationSchema={registerSchemaValidation}
    >
      {({ values, handleChange }) => (
        <Form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="name"
              type="String"
              placeholder="nombre"
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
              placeholder="telefono"
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
            aria-labelledby="gender"
          >
            {genderArray.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
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
              placeholder="repita la contraseña"
            />
            <ErrorMessage
              name="repitPass"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="license"
              type="string"
              placeholder="licencia"
            />
            <ErrorMessage
              name="license"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Field
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              name="city"
              type="string"
              placeholder="ciudad"
            />
            <ErrorMessage
              name="city"
              component="span"
              className="text-danger-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div
              className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta tus Curriculum aqui...</p>
              ) : (
                <p>Suelta tu Curriculum aqui, o has click para seleccionar</p>
              )}
            </div>
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

export default RegisterProfesional;
