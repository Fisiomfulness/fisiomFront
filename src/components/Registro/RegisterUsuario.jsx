'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { registerUserForm } from '@/services/register';
import { isDateOnRange } from '@/utils/helpers';
import { nameRegex } from '@/utils/regExp';

import { Button } from '@nextui-org/react';
import { CustomInput } from '@/features/ui';
import { Form, Formik } from 'formik';
import { InputsFormRegister } from './InputsFormsRegister';

//#region Formik config
const initialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  repitPass: '',
  gender: '',
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const yupRequired = Yup.string().required('Completa este campo');

const registerSchemaValidation = Yup.object({
  name: yupRequired
    .matches(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  email: yupRequired.email('No es un email'),
  dateOfBirth: yupRequired.test(
    'is-date-on-range',
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max)
  ),
  gender: Yup.mixed()
    .required('Requerido')
    .oneOf(genderList, 'Seleccione un genero'),
  password: yupRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: yupRequired.oneOf(
    [Yup.ref('password')],
    'Las contraseñas deben coincidir'
  ),
});

//#region Component
function RegistroUsuario({ conditionsAccepted }) {
  const handleSubmit = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error('Por favor acepte los términos y condiciones');
      return;
    }
    try {
      await registerUserForm(values);
      resetForm();
    } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={registerSchemaValidation}
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
