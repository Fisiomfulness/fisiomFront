'use client';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Select, SelectItem, Image } from '@nextui-org/react';
import { createBlog, updateBlog } from '@/services/blogs';
import { formikZodValidator, zodStrRequired } from '@/utils/validations';
import { z } from 'zod';

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
  image: null,
};

const MAX_FILE_SIZE = 1024 * 1024 * 3; // ? 3MB

const blogSchema = z.object({
  title: zodStrRequired()
    .min(3, 'Al menos 3 caracteres')
    .max(100, 'No mas de 100 caracteres'),
  text: zodStrRequired().refine(
    (value) => countHtmlCharacters(value) >= 300,
    'Mínimo: 300 caracteres'
  ),
  type_id: zodStrRequired('Seleccione el tipo de blog'),
  image: z
    .instanceof(File, 'Imagen requerida')
    .refine(
      (value) => value && value.type.startsWith('image/'),
      'El archivo no es una imagen'
    )
    .refine(
      (value) => value && value.size <= MAX_FILE_SIZE,
      'Tamaño de archivo máximo: 3MB'
    ),
});

const BlogForm = ({
  handleUpdate,
  types,
  initialValues = emptyValues,
  mode = 'create',
}) => {
  const { data: session } = useSession()
  const editorRef = useRef(null);

  const handleCreate = async (values, resetForm) => {
    try {
      const formData = new FormData();
      formData.append('professional_id', session.user?.id);
      for (const name in values) {
        formData.append(name, values[name]);
      }
      await createBlog(formData);
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
      validate={formikZodValidator(
        mode === 'create' ? blogSchema : blogSchema.partial()
      )}
      onSubmit={async (values, { resetForm }) => {
        mode === 'create'
          ? await handleCreate(values, resetForm)
          : await handleUpdate('update', values);
      }}
      className="space-y-6 max-h-full overflow-hidden"
    >
      {({ setFieldValue, values, errors, isSubmitting }) => (
        <Form className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden h-full">
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
            <label className="text-sm md:text-base font-medium text-gray-700">
              Imagen adjunta
            </label>
            <input
              id="blog-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFieldValue('image', e.target.files[0])}
            />
            <label
              htmlFor="blog-image-upload"
              className="py-2 px-3 w-48 text-center text-sm md:text-base bg-primary-500 rounded-md text-white cursor-pointer hover:opacity-90"
            >
              {mode === 'create' ? 'Sube una imagen' : 'Cambiar la imagen'}
            </label>

            <div className="flex items-center w-full">
              {values.image && values.image instanceof File && (
                <p className="w-full mx-1 px-2 outline-dashed outline-2 outline-offset-2 outline-secondary-300 truncate text-center text-primary-900">
                  {values.image.name}
                </p>
              )}
              {!values.image && initialValues.currentImage && (
                <Image src={initialValues.currentImage} className="h-32 w-48" />
              )}
            </div>

            {errors.image && (
              <span className="text-sm md:text-base text-danger-500 text-balance">
                {errors.image}
              </span>
            )}
          </div>

          <Button
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
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
