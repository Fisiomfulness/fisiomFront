import { Button } from '@nextui-org/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createComment } from '@/services/comments';
import * as Yup from 'yup';
import Rating from '@/components/Blog/Detail/Rating';
import toast from 'react-hot-toast';

const initialValues = {
  rating: 0,
  content: '',
};

const commentSchema = Yup.object({
  rating: Yup.number().required().min(1, 'Debe puntuar el blog').max(5),
  content: Yup.string()
    .required('Requerido')
    .min(3, 'Al menos 3 caracteres')
    .max(100, 'Limite: 100 caracteres'),
});

// ! TODO: DB ID HARDCODED. CHANGE FOR THE ACTUAL SESSION ID
const userId = '661df9cf4d019890d80057ac';

const CommentForm = ({ blogId }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const finalComment = { ...values, sender_id: userId, blog_id: blogId };
      await createComment(finalComment);
      resetForm();
      toast.success('Comentario añadido correctamente!');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Vuelva a intentarlo');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={commentSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="bg-[#D8EEF8] flex flex-col justify-between mt-3 md:mt-7 sm:grid sm:grid-cols-[2fr,2.5fr,1fr]">
          <div
            className={`flex flex-col gap-2 justify-between m-0 p-4 md:px-8 md:py-4 ${
              errors.rating ? 'lg:pb-[0.4rem]' : 'md:pb-4'
            }`}
          >
            <div className="flex gap-2 items-center justify-between w-full sm:flex-col min-[1050px]:flex-row">
              <label className="m-0 text-secondary font-bold">Valoración</label>
              <div aria-label="valoración" className="flex m-0">
                <Rating value={values.rating} setFieldValue={setFieldValue} />
              </div>
            </div>
            <ErrorMessage
              name="rating"
              component="span"
              className="text-danger-500 text-balance sm:text-center"
            />
          </div>
          <div className="w-full flex flex-col relative">
            <Field
              aria-label="comentario"
              className={`outline-secondary-400 flex-grow font-medium placeholder:text-gray-600 p-4 placeholder:italic rounded-none sm:mb-0 bg-zinc-100 md:px-6 ${
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
            disabled={isSubmitting}
            className="rounded-none p-4 !size-full bg-primary-500 disabled:opacity-15 disabled:cursor-wait"
          >
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
