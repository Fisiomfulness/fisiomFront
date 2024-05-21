import { CustomButton, CustomTextarea } from '@/features/ui';
import { Select, SelectItem } from '@nextui-org/react';
import { formikZodValidator } from '@/utils/validations';
import { Formik, Form } from 'formik';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { useAtom, useAtomValue } from 'jotai';
import { filtersAtom, questionsAtom } from './store/questions';
import { createQuestion } from '@/services/questions';

const initialValues = {
  text: '',
  specialtyId: '',
};

const questionSchema = z.object({
  text: z
    .string()
    .min(1, 'Completa este campo')
    .min(10, 'Al menos 10 caracteres')
    .max(500, 'No mas de 500 caracteres'),
  specialtyId: z.string().min(1, 'Eliga una especialidad'),
});

function QuestionForm() {
  const [store, setStore] = useAtom(questionsAtom);
  const { specialtyId } = useAtomValue(filtersAtom);
  const { specialties, questions } = store;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const sameSpecialty = values.specialtyId === specialtyId;
      const generalQuestion = values.specialtyId === '1';
      if (generalQuestion) delete values.specialtyId;
      const { newQuestion } = await createQuestion(values);
      if(sameSpecialty) setStore({ ...store, questions: [newQuestion, ...questions] });
      resetForm();
      toast.success('Pregunta creada correctamente');
    } catch (error) {
      toast.error('Oops... algo salio mal, intente mas tarde');
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={formikZodValidator(questionSchema)}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
      }) => (
        <Form className="w-full flex flex-col gap-4">
          <Select
            size="md"
            variant="bordered"
            color="secondary"
            radius="none"
            aria-label="especialidad de la pregunta"
            selectedKeys={[values.specialtyId]}
            label="Especialidad"
            name="specialtyId"
            value={values.specialtyId}
            isInvalid={errors.specialtyId ? true : false}
            errorMessage={errors && errors.specialtyId}
            onChange={handleChange}
          >
            {specialties &&
              [{ id: '1', name: 'General' }, ...specialties].map(
                (specialty) => (
                  <SelectItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </SelectItem>
                )
              )}
          </Select>
          <CustomTextarea
            name="text"
            minRows={5}
            placeholder="Escribe tu pregunta..."
            value={values.text}
            isInvalid={touched.text && errors.text ? true : false}
            errorMessage={touched.text && errors.text}
            onBlur={handleBlur}
            onChange={handleChange}
            classNames={{
              inputWrapper: '!bg-gray-50 rounded-none border-gray-200',
            }}
          />
          <CustomButton
            type="submit"
            className="max-w-52 uppercase !bg-[#3DAADD] rounded-sm"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
          >
            Enviar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
}

export default QuestionForm;
