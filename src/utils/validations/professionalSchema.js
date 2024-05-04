import { z } from 'zod';
import { cityRegex, nameRegex, numericRegex, phoneRegExp } from '../regExp';
import { isDateOnRange, isValidPdf } from '../helpers';
import { zodStrRequired } from './index';

const initialValues = {
  name: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  password: '',
  repitPass: '',
  license: '', // ? Opcional
  city: '',
  curriculum: null,
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const MAX_FILE_SIZE = 1048576; // ? 1MB

const professionalSchema = z
  .object({
    name: zodStrRequired()
      .regex(nameRegex, 'Debe contener solo letras')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres'),
    phone: zodStrRequired().regex(phoneRegExp, 'No es un teléfono valido'),
    email: zodStrRequired().email('No es un email'),
    dateOfBirth: zodStrRequired().refine(
      (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
      `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`
    ),
    password: zodStrRequired()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'No mas de 50 caracteres'),
    repitPass: zodStrRequired(),
    gender: z.enum(genderList, { message: 'Seleccione un genero' }),
    license: z
      .string()
      .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
      .max(10, 'No puede tener mas de 10 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional(),
    city: zodStrRequired()
      .min(2, 'La ciudad debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(
        cityRegex,
        'El nombre de la ciudad solo puede contener letras y espacios'
      ),
    curriculum: z
      .any()
      .refine(
        (value) => isValidPdf(value && value.name.toLowerCase()),
        'No es un PDF'
      )
      .refine(
        (value) => value && value.size <= MAX_FILE_SIZE,
        'Tamaño de archivo máximo: 1MB'
      ),
  })
  .refine((data) => data.password === data.repitPass, {
    message: 'Las contraseñas deben coincidir',
    path: ['repitPass'],
  });

export { initialValues, professionalSchema };
