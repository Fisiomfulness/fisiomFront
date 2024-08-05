'use client';
import { CustomInput, CustomTextarea } from '@/features/ui';
import { Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { formikZodValidator } from '@/utils/validations';
import { serviceSchema, serviceInitialValues } from '@/utils/validations/serviceSchema';
import { createService, updateService } from '@/services/professionals';
import { useSetAtom } from 'jotai';
import { updateServiceAtom } from './store/my_services';
import toast from 'react-hot-toast';

const ServiceForm = ({
  professionalId,
  initialValues = serviceInitialValues,
  isUpdate = false,
  onSubmit = () => {},
}) => {
  const updateServiceUI = useSetAtom(updateServiceAtom);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const newValues = { ...values, _professional: professionalId };
      if (isUpdate) {
        await updateService(values._id, newValues);
        updateServiceUI(values);
      } else {
        await createService(newValues);
      }
      resetForm();
      onSubmit();
      toast.success(`Servicio ${isUpdate ? 'actualizado' : 'creado'}`);
    } catch (error) {
      toast.error(
        error.response?.data.message || 'Oops algo salio mal... vuelva a intentarlo.'
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikZodValidator(serviceSchema)}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
      }) => (
        <Form>
          <h1 className="text-balance text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            {isUpdate ? 'Editar servicio' : 'Nuevo servicio'}
          </h1>

          <div className="vstack gap-4">
            <div className="vstack gap-1">
              <label className="text-lg">Servicio</label>
              <CustomInput
                name="title"
                variant="bordered"
                placeholder="Titulo del servicio"
                size="md"
                value={values.title}
                isInvalid={touched.title && errors.title ? true : false}
                errorMessage={touched.title && errors.title}
                onBlur={handleBlur}
                onChange={handleChange}
                classNames={{
                  inputWrapper: '!bg-[#F2F2F2] !border-1 !rounded-none',
                }}
              />
            </div>

            <div className="vstack gap-1">
              <label>Precio (PEN)</label>
              <CustomInput
                name="price"
                variant="flat"
                size="md"
                value={values.price}
                isInvalid={touched.price && errors.price ? true : false}
                errorMessage={touched.price && errors.price}
                onBlur={handleBlur}
                onChange={handleChange}
                classNames={{
                  inputWrapper: '!bg-[#F2F2F2] !border-1 !rounded-none',
                }}
              />
            </div>

            <div className="vstack gap-1">
              <label>Descripción</label>
              <CustomTextarea
                name="description"
                variant="flat"
                placeholder="Describe detalladamente tu servicio. Incluyendo características, beneficios y cualquier información relevante que los clientes necesiten saber."
                size="md"
                value={values.description}
                isInvalid={
                  touched.description && errors.description ? true : false
                }
                errorMessage={touched.description && errors.description}
                onBlur={handleBlur}
                onChange={handleChange}
                classNames={{
                  inputWrapper: '!bg-[#F2F2F2] !border-1 !rounded-none',
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            radius="none"
            fullWidth
            className="bg-[#3DAADD] uppercase font-semibold text-white mt-6"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            {isUpdate ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceForm;
