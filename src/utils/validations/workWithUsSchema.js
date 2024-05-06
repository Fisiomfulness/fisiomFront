import { z } from 'zod';
import { latamDniExp, phoneRegExp } from '../regExp';
import { zodStrRequired } from './index';
import { isValidPdf } from '../helpers';

const initialValues = {
  dniNumber: '',
  phone: '',
  email: '',
  curriculum: null,
  message: '',
};

const MAX_FILE_SIZE = 1048576; // ? 1MB

const workWithUsSchema = z.object({
  dniNumber: zodStrRequired('Requerido').regex(
    latamDniExp,
    'No es un DNI valido'
  ),
  phone: zodStrRequired('Requerido').regex(
    phoneRegExp,
    'No es un teléfono valido'
  ),
  email: zodStrRequired('Requerido').email('No es un email'),
  curriculum: z
    .instanceof(File, 'Curriculum requerido')
    .refine(
      (value) => isValidPdf(value && value.name.toLowerCase()),
      'No es un pdf'
    )
    .refine(
      (value) => value && value.size <= MAX_FILE_SIZE,
      'Tamaño de archivo máximo: 1MB'
    ),
  message: zodStrRequired('Requerido')
    .min(30, 'Min: 30 caracteres')
    .max(1000, 'Max: 1000 caracteres'),
});

export { initialValues, workWithUsSchema };
