"use client";

import { userInitialValues, userSchema } from "@/utils/validations/userSchema";

import { axiosRegisterUserForm } from "@/services/users";
import { formikZodValidator } from "@/utils/validations";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { InputsFormRegister } from "./InputsForms";
import { listInputsUser } from "./listInputs";

//#region Component
export const RegisterUser = ({ conditionsAccepted }) => {
  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error("Por favor acepte los términos y condiciones");
    } else {
      await axiosRegisterUserForm(values);
    }
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
        setFieldValue,
      }) => (
        <Form className="flex flex-col gap-2 w-full overflow-hidden min-[480px]:w-[90%]">
          <InputsFormRegister
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
            errors={errors}
            submitButonMessage={"Crear perfil"}
            listInputsValue={listInputsUser}
            setFieldValue={setFieldValue}
          />
        </Form>
      )}
    </Formik>
  );
};
