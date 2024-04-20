"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CustomButton, CustomInput, CustomLogo } from "@/features/ui";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";

const initialValues = {
  email: "",
  password: "",
};

const userSchemaValidation = Yup.object({
  email: Yup.string().required("requerido").email("No es un email"),
  password: Yup.string().required("requerido"),
});

export const Login = () => {
  const router = useRouter();

  const { setUser, user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const handleLogin = async (e) => {
    const response = await login({ email, password });

    if (response) {
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      router.push("/");
    }
  };

  return (
    <div className="center bg-primary-400">
      <img
        className="absolute bottom-0 left-0 h-1/2 max-sm:w-2/3 max-sm:h-auto"
        alt="logo_overlay"
        src="/logo_overlay.webp"
      />
      <div
        className={[
          "max-w-3xl w-full rounded-md bg-white max-sm:px-4 py-20",
          "flex flex-row max-sm:flex-col max-sm:gap-8 items-center justify-evenly",
        ].join(" ")}
      >
        <CustomLogo width="220" color="dark" />

        <Formik
          onSubmit={handleLogin}
          initialValues={initialValues}
          validationSchema={userSchemaValidation}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-sans" htmlFor="email">
                  email
                </label>
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
                <label className="font-sans" htmlFor="password">
                  password
                </label>
                <Field
                  className="px-3 py-2 outline-none border-2 border-gray-400 focus:border-primary-500 rounded-md"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-danger-500"
                />
              </div>
              <Button
                className="bg-primary-500 text-white font-sans"
                type="submit"
                isDisabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Logearse
              </Button>

              <Link href="/recupero" className="w-full italic mt-1">
                Contraseña <strong>olvidada ?</strong>
              </Link>

              <div className="flex flex-row justify-center items-center gap-4 mt-8">
                <p>No tiene cuenta?</p>
                <CustomButton
                  className="bg-primary-400 min-w-fit !w-fit py-2"
                  as={Link}
                  href="/registro"
                >
                  Registrarse
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
