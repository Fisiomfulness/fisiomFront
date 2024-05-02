"use client";

import { useCallback } from "react";

import Link from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { registerProfesionalForm } from "@/services/register";
import { actualMinDate } from "@/utils/helpers";
import { useDropzone } from "react-dropzone";

import { Button, Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { InputsFormRegister } from "./InputsFormsRegister";

//#region Formik config
const initialValues = {
  name: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  password: "",
  repitPass: "",
  license: "",
  city: "",
};

const yupRequired = Yup.string().required("");

const registerSchemaValidation = Yup.object({
  name: yupRequired.min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: yupRequired,
  email: yupRequired,
  dateOfBirth: Yup.date()
    .required("")
    .max(actualMinDate(), "Debes ser mayor de 18 años"),
  password: yupRequired.min(
    8,
    "La contraseña debe tener al menos 8 caracteres",
  ),
  repitPass: yupRequired.oneOf(
    [Yup.ref("password")],
    "Las contraseñas deben coincidir",
  ),
  license: yupRequired,
  city: yupRequired,
});

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
      {({ handleChange, errors }) => (
        <Form className="flex flex-col gap-3">
          <InputsFormRegister handleChange={handleChange} errors={errors} />

          <>
            <Input
              isRequired
              name="license"
              type="string"
              variant="underlined"
              label="Licencia"
              placeholder="Coloca tu licencia"
              onChange={handleChange}
              size="lg"
            />
            {errors.license && (
              <span className="text-danger-500 text-xs">{errors.license}</span>
            )}
          </>

          <>
            <Input
              name="city"
              type="string"
              isRequired
              variant="underlined"
              label="Ciudad"
              placeholder="Coloca tu ciudad"
              onChange={handleChange}
              size="lg"
            />
            {errors.city && (
              <span className="text-danger-500 text-xs">{errors.city}</span>
            )}
          </>

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
