"use client";

import { formikZodValidator } from "@/utils/validations";
import { userInitialValues, userSchema } from "@/utils/validations/userSchema";

import { axiosRegisterUserForm } from "@/services/users";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { InputsFormRegister } from "./InputsForms";

//#region Component
export const RegisterUser = ({ conditionsAccepted }) => {
  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error("Por favor acepte los términos y condiciones");
      return;
    }
    await axiosRegisterUserForm(values);
    resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={userInitialValues}
      validate={formikZodValidator(userSchema)}
    >
      {({
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        isSubmitting,
      }) => (
        <Form className="flex flex-col gap-3 w-full min-[480px]:w-[80%] lg:w-2/3">
          <InputsFormRegister
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
            errors={errors}
            isProfessional={false}
            submitButonMessage={"Crear perfil"}
          />
        </Form>
      )}
    </Formik>
  );
};
