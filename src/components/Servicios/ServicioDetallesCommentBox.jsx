'use client';
import { apiEndpoints } from '@/api_endpoints';
import { Button } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formikZodValidator, zodStrRequired } from '@/utils/validations';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import axios from 'axios';
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const ratingSchema = z.object({
  score: z.number().min(1, 'Debe dar una puntuación').max(5),
  description: zodStrRequired('Requerido')
    .min(3, 'Al menos 3 caracteres')
    .max(300, 'Limite: 300 caracteres'),
});

const ServicioDetallesCommentBox = ({ professional, session, setComments, setHasCommented }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await axios.post(apiEndpoints.professionalRating, {
        ...values,
        _professional: professional._id,
        _user: session?.user.id,
      }, { withCredentials: true });
      resetForm();
      setComments((prev) => [data.newRating, ...prev]);
      setHasCommented(true);
      toast.success('¡Gracias por tu valoración!');
    } catch (error) {
      toast.error(error?.response.data.message || 'Oops.. algo salio mal, vuelta a intentarlo!');
    }
  };

  return (
    <Formik
      initialValues={{
        score: 0,
        description: '',
      }}
      validate={formikZodValidator(ratingSchema)}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="bg-[#D8EEF8] flex flex-col justify-between mt-5 md:mt-7 lg:grid lg:grid-cols-[2fr,2.5fr,1fr]">
          <div
            className={`flex flex-col gap-2 justify-between m-0 p-4 md:py-4 md:px-6 lg:px-8 ${
              errors.score ? 'lg:pb-[0.4rem]' : 'md:pb-4'
            }`}
          >
            <div className="flex gap-2 items-center justify-between w-full lg:flex-col min-[1050px]:flex-row">
              <label className="m-0 text-secondary font-bold">Valoración</label>
              <div aria-label="valoración" className="flex m-0">
                <div>
                  <StarRatings
                    starRatedColor="#ffb829"
                    starHoverColor="#ffb829"
                    isSelectable={true}
                    rating={values.score}
                    changeRating={(rating) => setFieldValue('score', rating)}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
              </div>
            </div>
            <ErrorMessage
              name="score"
              component="span"
              className="text-danger-500 text-balance lg:text-center"
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Field
              aria-label="comentario"
              className={`border-2 border-transparent outline-none focus:border-primary-700 flex-grow font-medium placeholder:text-gray-600 p-4 placeholder:italic rounded-none sm:mb-0 md:px-6 bg-zinc-100 ${
                errors.description && touched.description ? 'pb-8' : 'sm:pb-4'
              }`}
              name="description"
              type="text"
              placeholder="agregar un comentario..."
            />
            <ErrorMessage
              name="description"
              component="span"
              className="text-danger-500 z-50 px-4 md:px-6 absolute left-0 bottom-[0.4rem] sm:py-0"
            />
          </div>

          <Button
            type="submit"
            color="primary"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
            className="rounded-none cursor-pointer p-4 !size-full bg-primary-500"
          >
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ServicioDetallesCommentBox;
