"use client";

import { InputsFormRegister } from "@/components/Registro/InputsForms";
import { formikZodValidator } from "@/utils/validations";
import { professionalInitialValues } from "@/utils/validations/professionalSchema";
import { userSchema } from "@/utils/validations/userSchema";

import { Card, CardBody } from "@nextui-org/react";
import { Form, Formik } from "formik";

export const EditProfileFormProfessional = ({ userDetail }) => {
  const editedData = {};

  const filterValues = (updatedValues) => {
    for (const key in updatedValues) {
      if (updatedValues[key] == userDetail.user[key]) {
        console.log("values", updatedValues[key]);
        editedData[key] = updatedValues[key];
      }
    }
  };

  const onSubmitForm = (values) => {
    const { curriculum, ...resData } = values;
    if (curriculum) {
      filterValues(values);
    }
    filterValues(resData);
    console.log(editedData, formikZodValidator(userSchema, values));
  };

  return (
    <Card className="grid gap-6 md:gap-x-4 items-center justify-items-center p-6 md:p-10 md:py-20 rounded-sm w-full max-w-[1380px]">
      <CardBody className="center flex-col w-full p-0 gap-8 md:gap-16"></CardBody>
      <Formik
        onSubmit={onSubmitForm}
        initialValues={professionalInitialValues}
        // validate={formikZodValidator(userSchema)}
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

            <button type="submit">Guardar cambios</button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
