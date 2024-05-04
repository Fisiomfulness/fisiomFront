'use client';

import toast from 'react-hot-toast';

import { initialValues, userSchema } from '@/utils/validations/userSchema';

import { CustomInput } from '@/features/ui';
import { axiosRegisterUserForm } from '@/services/users';
import { Button } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { InputsFormRegister } from './InputsFormsRegister';

//#region Component
export const RegisterUser = ({ conditionsAccepted }) => {
  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error('Por favor acepte los términos y condiciones');
      return;
    }
    try {
      await axiosRegisterUserForm(values);
      resetForm();
    } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
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
            aria-label="Nombre de usuario"
            type="string"
            variant="flat"
            placeholder="Nombre de usuario"
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

          <InputsFormRegister
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
            values={values}
            errors={errors}
          />

          <Button
            className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
            type="submit"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            Registrarse
          </Button>
        </Form>
      )}
    </Formik>
  );
};
