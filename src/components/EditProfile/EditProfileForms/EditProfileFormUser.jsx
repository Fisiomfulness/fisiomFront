"use client";

import { InputsFormRegister } from "@/components/Registro/InputsForms";
import { listInputsUser } from "@/components/Registro/listInputs";
import { Card } from "@nextui-org/react";
import { Formik } from "formik";
import { Form } from "react-aria-components";

function EditProfileFormUser({ userDetail }) {
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
              isProfessional={false}
              submitButonMessage={"Actualizar"}
              listInputsValue={listInputsUser}
              setFieldValue={setFieldValue}
              isUpdate={true}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
}
export default EditProfileFormUser;
