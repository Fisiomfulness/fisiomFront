"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { registerUserForm } from "@/services/register";
import { actualMinDate } from "@/utils/helpers";

import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { InputsFormRegister } from "./InputsFormsRegister";

//#region Formik config
const initialValues = {
  name: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  password: "",
  repitPass: "",
  gender: "",
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
  gender: yupRequired,
});

//#region Component
function RegistroUsuario({ Condicions }) {
  const registerResponse = async (values) => {
    const { repitPass, ...newValues } = values;
    await registerUserForm(newValues);
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
      {({ handleChange, errors }) => (
        <Form className="flex flex-col gap-3">
          <InputsFormRegister handleChange={handleChange} errors={errors} />

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
