'use client';

import Link from 'next/link';

import { formikZodValidator } from '@/utils/validations';
import { userInitialValues, userSchema } from '@/utils/validations/userSchema';

import { CustomInput } from '@/features/ui';
import { Button } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { InputsFormRegister } from './InputsFormsRegister';
import { removeObjFalsyValues } from '@/utils/helpers';
import { registerUserForm } from '@/services/register';
import toast from 'react-hot-toast';

//#region Component
function RegistroUsuario({ conditionsAccepted }) {
  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error('Por favor acepte los términos y condiciones');
      return;
    }
    values = removeObjFalsyValues(values);
    await registerUserForm(values);
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
        <Form className="flex flex-col gap-3 w-full overflow-hidden min-[480px]:w-[80%] lg:w-2/3">
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

export default RegistroUsuario;
