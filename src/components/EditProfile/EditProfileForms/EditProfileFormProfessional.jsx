"use client";

import { InputsFormRegister } from "@/components/Registro/InputsForms";
import { listInputsProfessional } from "@/components/Registro/listInputs";
import { Card } from "@nextui-org/react";
import { Form, Formik } from "formik";

/* const validationSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).equalTo(z.ref("password")).optional(),
});
 */
export const EditProfileFormProfessional = ({ userDetail }) => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Card className="grid items-center justify-items-center rounded-sm w-full py-8 max-w-[800px]">
      <Formik
        onSubmit={onSubmit}
        initialValues={userDetail}
        // validate={formikZodValidator(validationSchema.optional())}
      >
        {({
          handleChange,
          handleBlur,
          touched,
          values,
          errors,
          isSubmitting,
          setFieldValue,
          setValues,
        }) => (
          <Form className="flex flex-col gap-2 /w-full overflow-hidden min-[480px]:w-[90%]">
            <InputsFormRegister
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              values={values}
              errors={errors}
              isCurriculum={true}
              submitButonMessage={"Actualizar"}
              listInputsValue={listInputsProfessional}
              setFieldValue={setFieldValue}
              isUpdate={true}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
};
