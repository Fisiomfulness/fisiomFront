"use client";

import FileUpload from "@/components/Registro/FileUpload";
import { InputsFormRegister } from "@/components/Registro/InputsFormsRegister";
import { CustomInput } from "@/features/ui";
import {
  professionalInitialValues,
  professionalSchema,
} from "@/utils/validations/professionalSchema";

import { Card, CardBody } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { Button } from "react-aria-components";

export const EditProfileFormProfessional = ({ userDetail }) => {
  // const [isVisible, setIsVisible] = useState(false);
  // const toggleVisibility = () => setIsVisible(!isVisible);
  // // const [edit, setEdit] = useState(initialValues);
  // const [input, setInput] = useState(initialValues);
  // const [errors, setErrors] = useState(initialValues);
  const handleSubmitRegister = (values) => {
    console.log(values);
  };

  const handleChange = () => {};
  return (
    <Card className="grid md:grid-cols-[1.2fr,1fr] gap-6 md:gap-x-4 items-center justify-items-center p-6 md:p-10 md:py-20 rounded-sm w-full max-w-[1380px]">
      <CardBody className="center flex-col w-full p-0 gap-8 md:gap-16"></CardBody>
      <Formik
        onSubmit={handleSubmitRegister}
        initialValues={professionalInitialValues}
        validationSchema={professionalSchema}
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
            <CustomInput
              name="name"
              aria-label="Nombre completo"
              type="string"
              variant="flat"
              placeholder="Coloca tu nombre completo"
              value={values.name}
              isInvalid={touched.name && errors.name ? true : false}
              errorMessage={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              size="lg"
              classNames={{
                inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              }}
            />

            <CustomInput
              name="phone"
              aria-label="Teléfono"
              type="string"
              variant="flat"
              placeholder="Teléfono (sin espacios)"
              value={values.phone}
              isInvalid={touched.phone && errors.phone ? true : false}
              errorMessage={touched.phone && errors.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              size="lg"
              classNames={{
                inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              }}
            />

            <InputsFormRegister
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              values={values}
              errors={errors}
            />

            <CustomInput
              name="city"
              aria-label="Ciudad"
              type="string"
              variant="flat"
              placeholder="Ciudad"
              value={values.city}
              isInvalid={touched.city && errors.city ? true : false}
              errorMessage={touched.city && errors.city}
              onBlur={handleBlur}
              onChange={handleChange}
              size="lg"
              classNames={{
                inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              }}
            />

            <CustomInput
              name="license"
              aria-label="Numero de colegiado"
              type="string"
              variant="flat"
              placeholder="Numero de colegiado"
              value={values.license}
              isInvalid={touched?.license && errors.license ? true : false}
              errorMessage={touched?.license && errors.license}
              onBlur={handleBlur}
              onChange={handleChange}
              size="lg"
              classNames={{
                inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              }}
            />

            <FileUpload name="curriculum" />

            <Button
              className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
              type="submit"
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
            >
              Editar
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
