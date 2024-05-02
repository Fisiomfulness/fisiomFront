import { useUser } from "@/hooks/useUser";
// import { login } from '@/services/users';
import { login } from "@/services/login";
import { Button, Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";

const initialValues = {
  email: "",
  password: "",
};

const userSchemaValidation = Yup.object({
  email: Yup.string().required(""),
  password: Yup.string().required(""),
});

const UserLoginComponent = () => {
  const router = useRouter();
  const { setUser, user } = useUser();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (values) => {
    const response = await login(values);
    if (response) {
      setUser(response.data);
      router.push("/");
    }
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={initialValues}
      validationSchema={userSchemaValidation}
    >
      {({ handleChange, isSubmitting, errors }) => (
        <Form className="flex flex-col gap-3">
          <>
            <Input
              isRequired
              name="email"
              type="string"
              variant="underlined"
              label="Correo electronico"
              placeholder="Coloca tu correo electronico"
              onChange={handleChange}
              size="lg"
            />
            {errors.name && (
              <span className="text-danger-500 text-xs">{errors.email}</span>
            )}
          </>

          <>
            <Input
              isRequired
              name="password"
              label="Password"
              variant="underlined"
              placeholder="Coloca tu contraseña"
              onChange={handleChange}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            {errors.password && (
              <span className="text-danger-500 text-xs">{errors.password}</span>
            )}
          </>

          <Button
            className="bg-primary-500 text-white font-sans"
            type="submit"
            isDisabled={isSubmitting || Object.keys(errors).length > 0}
          >
            Ingresar
          </Button>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p>No tienes cuenta?</p>
            <Button
              className="bg-primary-500 text-white font-sans"
              as={Link}
              href="/registro"
            >
              Registrarse
            </Button>
          </div>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p>Olvidaste tu password?</p>
            <Button
              className="bg-primary-500 text-white font-sans"
              as={Link}
              href="/password_olvidada"
            >
              Cambiar password
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserLoginComponent;
