'use client';
import { CustomInput } from '@/features/ui';
import { registerProfesionalForm } from '@/services/register';
import { Button, DateInput, Divider } from '@nextui-org/react';
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

          <Divider />
          <CustomInput
            name="streetName"
            aria-label="Calle"
            autocomplete="streetName"
            variant="flat"
            placeholder="Calle"
            size="lg"
            value={values.streetName}
            isInvalid={touched.streetName && errors.streetName ? true : false}
            errorMessage={touched.streetName && errors.streetName}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />
          <div className="flex flex-col sm:flex-row gap-1 w-full justify-between">
            <CustomInput
              name="streetNumber"
              aria-label="Número"
              autocomplete="streetNumber"
              variant="flat"
              placeholder="Número"
              size="lg"
              value={values.streetNumber}
              isInvalid={
                touched.streetNumber && errors.streetNumber ? true : false
              }
              errorMessage={touched.streetNumber && errors.streetNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              classNames={{
                inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
                base: 'sm:w-3/5',
              }}
            />

            <CustomInput
              name="floorAppartment"
              aria-label="Piso/Dpto"
              autocomplete="floorAppartment"
              variant="flat"
              placeholder="Piso/Dpto"
              size="lg"
              value={values.floorAppartment}
              isInvalid={
                touched.floorAppartment && errors.floorAppartment ? true : false
              }
              errorMessage={touched.floorAppartment && errors.floorAppartment}
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              classNames={{
                inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
                base: 'sm:w-2/5',
              }}
            />
          </div>

          <CustomInput
            name="city"
            aria-label="Ciudad"
            autocomplete="city"
            variant="flat"
            placeholder="Ciudad"
            size="lg"
            value={values.city}
            isInvalid={touched.city && errors.city ? true : false}
            errorMessage={touched.city && errors.city}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />

          <CustomInput
            name="state"
            aria-label="Estado/Provincia"
            autocomplete="state"
            variant="flat"
            placeholder="Estado/Provincia"
            size="lg"
            value={values.state}
            isInvalid={touched.state && errors.state ? true : false}
            errorMessage={touched.state && errors.state}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />

          <CustomInput
            name="country"
            aria-label="País"
            autocomplete="country"
            variant="flat"
            placeholder="País"
            size="lg"
            value={values.country}
            isInvalid={touched.country && errors.country ? true : false}
            errorMessage={touched.country && errors.country}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            classNames={{
              inputWrapper: '!bg-[#F4F4F4] !border-1 border-transparent',
            }}
          />
          <Divider />

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
