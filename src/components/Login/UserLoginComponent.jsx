import { useUser } from "@/hooks/useUser";
import { login } from "@/services/login";
import { Button } from "@nextui-org/react";
import { CustomInput } from "@/features/ui";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";
import Link from "next/link";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const userSchemaValidation = Yup.object({
  email: Yup.string().required("Requerido").email("No es un email"),
  password: Yup.string().required("Requerido"),
});

const UserLoginComponent = () => {
  const { setUser, user } = useUser();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (values) => {
    const responseNextAuth = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!responseNextAuth.ok) {
      return toast.error(responseNextAuth.error);
    }

    toast.success("Login exitoso");
    router.push("/user");

    // try {
    //   const response = await login(values);
    //   setUser(response.data);
    //   router.push('/');
    // } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={initialValues}
      validationSchema={userSchemaValidation}
    >
      {({ handleChange, isSubmitting, errors }) => (
        <Form className="flex flex-col gap-3">
          <CustomInput
            isRequired
            name="email"
            type="string"
            variant="flat"
            placeholder="Email"
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
            }}
          />

          <CustomInput
            isRequired
            name="password"
            variant="flat"
            placeholder="Contraseña"
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
            }}
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

          <Button
            className="bg-primary-500 mt-2 text-white uppercase rounded-none font-semibold tracking-wider"
            type="submit"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            Ingresar
          </Button>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <a className="text-sm hover:underline" href="/password_olvidada">
              Olvidaste <span className="font-bold">tu contraseña?</span>
            </a>
          </div>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p className="text-sm">No tienes cuenta?</p>
            <Button
              className="bg-primary-500 text-white rounded-md font-semibold"
              as={Link}
              href="/registro"
            >
              Registrarse
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserLoginComponent;
