import { useContext } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { login } from "@/services/login";
import { UserContext } from "@/context/User";

const initialValues = {
  email: "",
  password: "",
};

const userSchemaValidation = Yup.object({
  email: Yup.string().required("requerido").email("No es un email"),
  password: Yup.string().required("requerido"),
});

const LoginUser = () => {
  const router = useRouter();
  const { setUser, user } = useContext(UserContext);

  const handleLogin = async (values) => {
    const response = await login(values);

    if (response) {
      localStorage.setItem("token", response.data.token);
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
        </Form>
      )}
    </Formik>
  );
};

export default LoginUser;
