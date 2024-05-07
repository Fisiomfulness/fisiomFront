'use client';
import { CustomInput } from '@/features/ui';
import { registerProfesionalForm } from '@/services/register';
import { Button } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { InputsFormRegister } from './InputsFormsRegister';

import { formikZodValidator } from '@/utils/validations';
import { removeObjFalsyValues } from '@/utils/helpers';
import {
  professionalInitialValues,
  professionalSchema,
} from '@/utils/validations/professionalSchema';
import Link from 'next/link';
import toast from 'react-hot-toast';
import FileUpload from './FileUpload';

//#region Formik config

function RegisterProfesional({ conditionsAccepted }) {
  const handleSubmitRegister = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error('Por favor acepte los términos y condiciones');
      return;
    }
    values = removeObjFalsyValues(values);
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    await registerProfesionalForm(formData);
    resetForm();
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
        <Form className="flex flex-col gap-3 w-full min-[480px]:w-[80%] lg:w-2/3">
          <CustomInput
            name="name"
            aria-label="Nombre completo"
            type="string"
            variant="flat"
            placeholder="Nombre completo"
            value={values.name}
            isInvalid={touched.name && errors.name ? true : false}
            errorMessage={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
            size="lg"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
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
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
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
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />

          <FileUpload name="curriculum" />

          <Button
            className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
            type="submit"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            Crear perfil
          </Button>

          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p className="text-sm">¿Ya esta registrado?</p>
            <Button
              className="bg-primary-500 text-white rounded-md font-semibold"
              as={Link}
              href="/login"
            >
              Ingresar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterProfesional;
