"use client";
import { CustomButton, CustomInput, CustomLogo } from "@/features/ui";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@nextui-org/react";
import { resetPassword } from "@/services/recoveryAcount";

import { z } from "zod";
import { useState } from "react";
import { formikZodValidator, zodStrRequired } from "@/utils/validations";
import Link from "next/link";

const initialValues = {
  password: "",
  confirmPass: "",
};

const validationSchema = z.object({
  password: zodStrRequired("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPass: zodStrRequired("Requerido")
}).refine((data) => data.password === data.confirmPass, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPass'],
});

const CambiarPassword = ({ token }) => {
  const handleSubmit = (values) => {
    const data = {
      token: token.params.token,
      newPassword: values.password,
    };
    resetPassword(data);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={formikZodValidator(validationSchema)}
    >
      {() => (
        <Form className="flex flex-col gap-3">
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
              name="confirmPass"
              type="password"
              placeholder="Repita la contraseña"
            />
            <ErrorMessage
              name="confirmPass"
              component="span"
              className="text-danger-500"
            />
          </div>

          <Button className="bg-primary-500 text-white font-sans" type="submit">
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CambiarPassword;
