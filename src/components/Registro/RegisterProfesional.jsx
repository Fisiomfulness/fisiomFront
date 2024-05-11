"use client";
import { Form, Formik } from "formik";
import { InputsFormRegister } from "./InputsForms";

import { axiosRegisterProfessionalForm } from "@/services/users";
import { removeObjFalsyValues } from "@/utils/helpers";
import { formikZodValidator } from "@/utils/validations";
import {
  professionalInitialValues,
  professionalSchema,
} from "@/utils/validations/professionalSchema";
import toast from "react-hot-toast";
import { listInputsProfessional } from "./listInputs";

//#region Formik config

export function RegisterProfessional({ conditionsAccepted }) {
  const handleSubmitRegister = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error("Por favor acepte los términos y condiciones");
      return;
    }
    values = removeObjFalsyValues(values);
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    await axiosRegisterProfessionalForm(formData);
  };

  return (
    <Formik
      onSubmit={handleSubmitRegister}
      initialValues={professionalInitialValues}
      validate={formikZodValidator(professionalSchema)}
    >
      {({
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        isSubmitting,
      }) => (
        <Form className="flex flex-col gap-2 w-full overflow-hidden min-[480px]:w-[90%]">
          <InputsFormRegister
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
            errors={errors}
            isCurriculum={true}
            submitButonMessage={"Crear perfil"}
            listInputsValue={listInputsProfessional}
          />
        </Form>
      )}
    </Formik>
  );
}
