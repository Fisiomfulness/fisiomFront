import { Button } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createComment } from '@/services/comments';
import { scrollTo } from '@/utils/helpers';

import { z } from 'zod';
import { formikZodValidator, zodStrRequired } from '@/utils/validations';
import Rating from '@/components/Blog/detail/Rating';
import toast from 'react-hot-toast';

const initialValues = {
  rating: 0,
  content: '',
};

const commentSchema = z.object({
  rating: z.number().min(1, 'Debe puntuar el blog').max(5),
  content: zodStrRequired('Requerido')
    .min(3, 'Al menos 3 caracteres')
    .max(100, 'Limite: 100 caracteres'),
});

const CommentForm = ({ userId, blogId, setComments, setHasUserCommented }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const finalComment = { ...values, sender_id: userId, blog_id: blogId };
      const { newComment } = await createComment(finalComment);
      setComments((prev) => [newComment, ...prev]);
      resetForm();
      setHasUserCommented(true);
      toast.success('¡Gracias por tu comentario!');
      scrollTo('comments-container'); // * scrolls to top for see the comment.
    } catch (error) {
      toast.error('Oops! Vuelva a intentarlo');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikZodValidator(commentSchema)}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="bg-[#D8EEF8] flex flex-col justify-between mt-5 md:mt-7 lg:grid lg:grid-cols-[2fr,2.5fr,1fr]">
          <div
            className={`flex flex-col gap-2 justify-between m-0 p-4 md:py-4 md:px-6 lg:px-8 ${
              errors.rating ? 'lg:pb-[0.4rem]' : 'md:pb-4'
            }`}
          >
            <div className="flex gap-2 items-center justify-between w-full lg:flex-col min-[1050px]:flex-row">
              <label className="m-0 text-secondary font-bold">Valoración</label>
              <div aria-label="valoración" className="flex m-0">
                <Rating value={values.rating} setFieldValue={setFieldValue} />
              </div>
            </div>
            <ErrorMessage
              name="rating"
              component="span"
              className="text-danger-500 text-balance lg:text-center"
            />
          </div>

          <div className="w-full flex flex-col relative">
            <Field
              aria-label="comentario"
              className={`border-2 border-transparent outline-none focus:border-primary-700 flex-grow font-medium placeholder:text-gray-600 p-4 placeholder:italic rounded-none sm:mb-0 md:px-6 bg-zinc-100 ${
                errors.content && touched.content ? 'pb-8' : 'sm:pb-4'
              }`}
              name="content"
              type="text"
              placeholder="agregar un comentario..."
            />
            <ErrorMessage
              name="content"
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

export default CommentForm;
