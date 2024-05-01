'use client';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@nextui-org/react';
import { CgAttachment } from 'react-icons/cg';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { MdCheckCircleOutline } from 'react-icons/md';

import { latamDniExp, phoneRegExp } from '@/utils/regExp';
import { sendJobPostulation } from '@/services/mails';
import * as Yup from 'yup';
import validation from './validation';
import toast from 'react-hot-toast';

const initialValues = {
  dniNumber: '',
  phone: '',
  email: '',
  curriculum: null,
  message: '',
};

const MAX_FILE_SIZE = 1048576; // ? 1MB

function isValidPdf(fileName) {
  return fileName && fileName.split('.').pop() === 'pdf';
}

const validationSchema = Yup.object({
  dniNumber: Yup.string()
    .required('Requerido')
    .matches(latamDniExp, 'No es un DNI valido'),
  phone: Yup.string()
    .required('Requerido')
    .matches(phoneRegExp, 'No es un teléfono valido'),
  email: Yup.string().required('Requerido').email('No es un email'),
  curriculum: Yup.mixed()
    .required('Requerido')
    .test('is-valid-type', 'No es un pdf', (value) =>
      isValidPdf(value && value.name.toLowerCase())
    )
    .test(
      'is-valid-size',
      'Tamaño de archivo máximo: 1MB',
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
  message: Yup.string()
    .required('Requerido')
    .min(30, 'Min: 30 caracteres')
    .max(1000, 'Max: 1000 caracteres'),
});

const FileInput = ({ setFieldValue }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue('curriculum', file);
    }
  };

  return (
    <div className="relative w-full h-fit">
      <input
        type="text"
        value={fileName}
        readOnly
        placeholder="Selecciona un archivo PDF"
        className="w-full px-3 py-2 bg-[#F1F1F1] text-gray-700 rounded-sm border outline-none border-[#DCDCDC]"
      />
      <label className="absolute top-0 right-0 p-2 bg-[#F1F1F1] border border-[#DCDCDC] h-full rounded-sm cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <CgAttachment className="text-primary-400 size-full" />
      </label>
    </div>
  );
};

const TrabajaConNosotrosClient = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      for (const name in values) {
        formData.append(name, values[name]);
      }
      await sendJobPostulation(formData);
      resetForm();
      toast.success('Solicitud enviada!');
    } catch (error) {
      console.error(error);
      toast.error('Oops! Vuelva a intentarlo mas tarde...');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, isSubmitting, setFieldValue }) => (
        <Form className="w-full grid md:grid-cols-2 gap-y-6 md:gap-x-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="documentType" className="font-bold">
                Tipo de documento
              </label>
              <input
                placeholder="DNI"
                readOnly
                className="px-3 py-2 bg-[#F1F1F1] rounded-sm border outline-none border-[#DCDCDC] placeholder:text-slate-600 placeholder:font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dniNumber" className="font-bold">
                Numero de documento
              </label>
              <Field
                name="dniNumber"
                placeholder="12345678"
                className="px-3 py-2 bg-[#F1F1F1] text-gray-950 rounded-sm border outline-none border-[#DCDCDC] focus:border-gray-400"
              />
              <ErrorMessage
                name="dniNumber"
                component="span"
                className="text-danger-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-bold">
                Numero de teléfono{' '}
                <span className="text-sm font-normal">(sin espacios)</span>
              </label>
              <Field
                name="phone"
                placeholder="+511122334455"
                className="px-3 py-2 bg-[#F1F1F1] text-gray-700 rounded-sm border outline-none border-[#DCDCDC] focus:border-gray-400"
              />
              <ErrorMessage
                name="phone"
                component="span"
                className="text-danger-500"
              />
            </div>

            <Button
              type="submit"
              isDisabled={Object.keys(errors).length > 0 || isSubmitting}
              className="hidden mt-auto bg-primary-500 font-bold text-white uppercase rounded-sm w-full md:block"
            >
              enviar
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <Field
                name="email"
                placeholder="example@mail.com"
                className="px-3 py-2 bg-[#F1F1F1] text-gray-700 rounded-sm border outline-none border-[#DCDCDC] focus:border-gray-400"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-danger-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="curriculum" className="font-bold">
                Agrega tu CV
              </label>
              <FileInput setFieldValue={setFieldValue} />
              {errors.curriculum && (
                <span className="text-danger-500"> {errors.curriculum}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-bold">
                Mensaje
              </label>
              <Field
                name="message"
                as="textarea"
                placeholder="Corta presentación..."
                spellCheck={true}
                rows={4}
                className="resize-none px-3 py-2 bg-[#F1F1F1] text-gray-700 rounded-sm border outline-none border-[#DCDCDC] focus:border-gray-400"
              />
              <ErrorMessage
                name="message"
                component="span"
                className="text-danger-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            isDisabled={Object.keys(errors).length > 0 || isSubmitting}
            className="bg-primary-500 font-bold text-white uppercase rounded-sm w-full md:hidden"
          >
            enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TrabajaConNosotrosClient;
