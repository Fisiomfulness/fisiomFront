'use client';
import { useRef } from 'react';
import { useUser } from '@/hooks/useUser';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Select, SelectItem, Image } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { createBlog, updateBlog } from '@/services/blogs';
import { z } from 'zod';
import { formikZodValidator, zodStrRequired } from '@/utils/validations';

import Tiptap from '@/components/Tiptap';
import toast from 'react-hot-toast';

const countHtmlCharacters = (htmlString) => {
  // ? Tag <br> count like a character like tiptap
  const text = htmlString.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
  return text.length;
};

const emptyValues = {
  title: '',
  text: '',
  type_id: '',
  image: '',
};

// ! TODO = CAMBIAR NEXTCLOUDINARY POR SUBIR UN FILE.
const blogSchema = z.object({
  title: zodStrRequired()
    .min(3, 'Al menos 3 caracteres')
    .max(100, 'No mas de 100 caracteres'),
  text: zodStrRequired().refine(
    (value) => countHtmlCharacters(value) >= 300,
    'Mínimo: 300 caracteres'
  ),
  type_id: zodStrRequired('Seleccione el tipo de blog'),
  image: zodStrRequired('Adjunte una imagen'),
});

const BlogForm = ({
  handleUpdate,
  types,
  initialValues = emptyValues,
  mode = 'create',
}) => {
  const { user } = useUser();
  const editorRef = useRef(null);

  const handleCreate = async (values, resetForm) => {
    try {
      await createBlog({ ...values, professional_id: user?.userId });
      // * Clears content of editor from tiptap
      if (editorRef) editorRef.current?.commands.clearContent(true);
      resetForm();
      toast.success('Blog creado correctamente!');
    } catch (error) {
      toast.error('Oops! Vuelva a intentarlo mas tarde...');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikZodValidator(mode === 'create' ? blogSchema : blogSchema.partial())}
      onSubmit={(values, { resetForm }) => {
        mode === 'create'
          ? handleCreate(values, resetForm)
          : handleUpdate('update', values);
      }}
      className="space-y-6 max-h-full overflow-hidden"
    >
      {({ setFieldValue, values, errors, isSubmitting }) => (
        <Form className="flex flex-col gap-3 overflow-y-auto h-full">
          <div>
            <Select
              size="md"
              aria-label="tipo de blog"
              selectedKeys={[values.type_id]}
              label="Tipo de blog"
              name="type_id"
              onChange={(e) => setFieldValue('type_id', e.target.value)}
              classNames={{
                trigger: 'bg-gray-100 border border-gray-300',
              }}
            >
              {types?.map((type) => (
                <SelectItem key={type._id} value={type._id}>
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
                    type="button"
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
            className="mt-auto w-full inline-flex items-center p-5 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-200"
            type="submit"
          >
            {mode === 'create' ? 'Publicar' : 'Actualizar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BlogForm;
