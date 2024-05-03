'use client';
import { Button } from '@nextui-org/react';
import { CustomInput } from '@/features/ui';
import { Form, Formik } from 'formik';
import { InputsFormRegister } from './InputsFormsRegister';
import { registerProfesionalForm } from '@/services/register';
import { isDateOnRange, isValidPdf } from '@/utils/helpers';
import {
  nameRegex,
  phoneRegExp,
  cityRegex,
  numericRegex,
} from '@/utils/regExp';

import FileUpload from './FileUpload';
import Link from 'next/link';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

//#region Formik config
const initialValues = {
  name: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  password: '',
  repitPass: '',
  license: '', // ? Opcional
  city: '',
  curriculum: null,
};

const yupRequired = Yup.string().required('Completa este campo');
const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const MAX_FILE_SIZE = 1048576; // ? 1MB

const registerSchemaValidation = Yup.object({
  name: yupRequired
    .matches(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  phone: yupRequired.matches(phoneRegExp, 'No es un teléfono valido'),
  email: yupRequired.email('No es un email'),
  dateOfBirth: yupRequired.test(
    'is-date-on-range',
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max)
  ),
  password: yupRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: yupRequired.oneOf(
    [Yup.ref('password')],
    'Las contraseñas deben coincidir'
  ),
  gender: Yup.mixed()
    .required('Requerido')
    .oneOf(genderList, 'Seleccione un genero'),
  license: Yup.string()
    .notRequired()
    .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
    .max(10, 'No puede tener mas de 10 dígitos')
    .matches(numericRegex, 'Debe ser numérico'),
  city: yupRequired
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'No puede contener mas de 50 caracteres')
    .matches(
      cityRegex,
      'El nombre de la ciudad solo puede contener letras y espacios'
    ),
  curriculum: Yup.mixed()
    .required('Suba un curriculum')
    .test('is-valid-type', 'No es un PDF', (value) =>
      isValidPdf(value && value.name.toLowerCase())
    )
    .test(
      'is-valid-size',
      'Tamaño de archivo máximo: 1MB',
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

function RegisterProfesional({ conditionsAccepted }) {
  const handleSubmitRegister = async (values, { resetForm }) => {
    if (!conditionsAccepted) {
      toast.error('Por favor acepte los términos y condiciones');
      return;
    }
    if (values.license === '') delete values.license;
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    try {
      await registerProfesionalForm(formData);
      resetForm();
    } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleSubmitRegister}
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
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
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
