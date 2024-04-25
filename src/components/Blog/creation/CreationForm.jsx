'use client';
import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Select, SelectItem, Image } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { createBlog } from '@/services/blogs';
import Tiptap from '@/components/Tiptap';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const countHtmlCharacters = (htmlString) => {
  // ? Tag <br> count like a character like tiptap
  const text = htmlString.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
  return text.length;
}

const initialValues = {
  title: '',
  text: '',
  type_id: '',
  image: '',
};

const blogSchema = Yup.object({
  title: Yup.string()
    .required('Requerido')
    .min(3, 'Al menos 3 caracteres')
    .max(100, 'No mas de 100 caracteres'),
  text: Yup.string()
    .required('Requerido')
    .test(
      'len',
      'Mínimo: 300 caracteres',
      (value) => value && countHtmlCharacters(value) >= 300
    ),
  type_id: Yup.string().required('Seleccione el tipo de blog'),
  image: Yup.string()
    .required('Adjunte una imagen')
    .url('No es una url valida'),
});

// ! TODO: HARDCODED... CHANGE THIS FOR REAL SESSION ID LATER.
const sessionId = '662a6a6d5b6db4c8ed71ba5d';

const CreationForm = ({ types }) => {
  const editorRef = useRef(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createBlog({ ...values, professional_id: sessionId });
      // * Clears content of editor from tiptap
      if (editorRef) editorRef.current?.commands.clearContent(true);
      resetForm();
      toast.success('Blog creado correctamente!');
    } catch (error) {
      toast.error('Oops! Vuelva a intentarlo');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={blogSchema}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {({ setFieldValue, values, errors, isSubmitting }) => (
        <Form className="flex flex-col gap-3">
          <div>
            <Select
              size="md"
              aria-label="blog-type"
              selectedKeys={[values.type_id]}
              label="Tipo de blog"
              name="type_id"
              onChange={(e) => setFieldValue('type_id', e.target.value)}
              classNames={{
                trigger: 'bg-gray-100 border border-gray-300',
              }}
            >
              {types.map((type) => (
                <SelectItem key={type._id} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>
            {errors.type_id && (
              <span className="text-sm md:text-base text-danger-500 text-balance">
                {errors.type_id}
              </span>
            )}
          </div>

          <div>
            <label
              className="text-sm md:text-base font-medium text-gray-700"
              htmlFor="title"
            >
              Titulo
            </label>
            <input
              className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm outline-none focus:border-primary-500"
              name="title"
              value={values.title}
              placeholder="Ingresa el titulo del blog"
              type="text"
              onChange={(e) =>
                setFieldValue('title', e.target.value.trimStart())
              }
            />
            {errors.title && (
              <span className="text-sm md:text-base text-danger-500 text-balance">
                {errors.title}
              </span>
            )}
          </div>

          <div>
            <label
              className="text-sm md:text-base font-medium text-gray-700"
              htmlFor="text"
            >
              Contenido
            </label>
            <Tiptap
              editorRef={editorRef}
              content={values.text}
              onChange={(newContent) => setFieldValue('text', newContent)}
              limitCharacters={8000}
            />
            {errors.text && (
              <span className="text-sm md:text-base text-danger-500 text-balance">
                {errors.text}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-sm md:text-base font-medium text-gray-700"
              htmlFor="featured-image"
            >
              Imagen adjunta
            </label>

            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-upload"
              options={{
                sources: ['local', 'url'],
                clientAllowedFormats: ['image'],
                maxFiles: 1,
                maxFileSize: 5500000,
              }}
              onSuccess={(result, { widget }) => {
                setFieldValue('image', result?.info.secure_url);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <button
                    className="bg-primary-600 rounded-md min-w-fit w-full max-w-48 px-3 py-2 text-white"
                    onClick={() => open()}
                  >
                    Sube una imagen
                  </button>
                );
              }}
            </CldUploadWidget>

            <div className="flex items-center justify-start w-full">
              {values.image !== '' && (
                <Image src={values.image} className="h-32 w-48" />
              )}
              {errors.image && (
                <span className="text-sm md:text-base text-danger-500 text-balance">
                  {errors.image}
                </span>
              )}
            </div>
          </div>

          <Button
            isDisabled={isSubmitting || Object.keys(errors).length > 0}
            className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-200"
            type="submit"
          >
            Publicar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreationForm;
