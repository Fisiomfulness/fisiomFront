import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { CustomInput } from "@/features/ui";
import { Form, Formik } from "formik";
import { formikZodValidator, zodStrRequired } from "@/utils/validations";
import { signIn } from "next-auth/react";
import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = z.object({
  email: zodStrRequired().email("No es un email"),
  password: zodStrRequired(),
});

const UserLoginComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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

    toast.success("Has iniciado sesión correctamente");
    router.push("/");
  };

  // Nueva función para login con Google
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={initialValues}
      validate={formikZodValidator(loginSchema)}
    >
      {({
        handleChange,
        handleBlur,
        isSubmitting,
        touched,
        values,
        errors,
      }) => (
        <Form className="flex flex-col gap-3">
          <CustomInput
            name="email"
            type="string"
            variant="flat"
            placeholder="Email"
            value={values.email}
            isInvalid={touched.email && errors.email ? true : false}
            errorMessage={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
            }}
          />

          <CustomInput
            name="password"
            variant="flat"
            placeholder="Contraseña"
            value={values.password}
            isInvalid={touched.password && errors.password ? true : false}
            errorMessage={touched.password && errors.password}
            onBlur={handleBlur}
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

          {/* Botón de Google */}
          <Button
            className="flex items-center justify-center  mt-2 text-gray-800 uppercase rounded-none font-semibold tracking-wider"
            onClick={handleGoogleLogin}
            isDisabled={isSubmitting}
          >
            <FcGoogle className="mr-2" size={24} />
            Ingresar con Google
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
