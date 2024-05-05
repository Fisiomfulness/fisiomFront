import { z } from 'zod';
import { zodStrRequired } from '.';

const workWithUsInitialValues = {
  dniNumber: '',
  phone: '',
  email: '',
  curriculum: null,
  message: '',
};

const MAX_FILE_SIZE = 1048576; // ? 1MB

const workWithUsSchema = z.object({
  dniNumber: zodStrRequired('require').matches(
    latamDniExp,
    'No es un DNI valido',
  ),
  phone: Yup.string()
    .required('Requerido')
    .matches(phoneRegExp, 'No es un teléfono valido'),
  email: Yup.string().required('Requerido').email('No es un email'),
  curriculum: Yup.mixed()
    .required('Requerido')
    .test('is-valid-type', 'No es un pdf', (value) =>
      isValidPdf(value && value.name.toLowerCase()),
    )
    .test(
      'is-valid-size',
      'Tamaño de archivo máximo: 1MB',
      (value) => value && value.size <= MAX_FILE_SIZE,
    ),
  message: Yup.string()
    .required('Requerido')
    .min(30, 'Min: 30 caracteres')
    .max(1000, 'Max: 1000 caracteres'),
});
