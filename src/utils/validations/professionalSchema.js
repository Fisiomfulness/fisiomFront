import { z } from 'zod';
import { isDateOnRange, isValidPdf } from '../helpers';
import { cityRegex, nameRegex, numericRegex, phoneRegExp } from '../regExp';
import { zodStrRequired } from './index';

const professionalInitialValues = {
  name: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  password: '',
  confirmPass: '',
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
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres')
      .regex(nameRegex, 'Debe contener solo letras'),
    phone: zodStrRequired().regex(phoneRegExp, 'No es un teléfono valido'),
    email: zodStrRequired().email('No es un email'),
    dateOfBirth: z
      .string()
      .date('No es una fecha valida')
      .refine(
        (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
        `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`
      ),
    password: zodStrRequired()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'No mas de 50 caracteres'),
    confirmPass: zodStrRequired(),
    gender: z.enum(genderList, { message: 'Seleccione un genero' }),
    license: z
      .string()
      .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
      .max(10, 'No puede tener mas de 10 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional()
      .or(z.literal('')),
    city: zodStrRequired()
      .min(2, 'La ciudad debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(
        cityRegex,
        'El nombre de la ciudad solo puede contener letras y espacios'
      ),
    curriculum: z
      .instanceof(File, 'Curriculum requerido')
      .refine(
        (value) => isValidPdf(value && value.name.toLowerCase()),
        'No es un PDF'
      )
      .refine(
        (value) => value && value.size <= MAX_FILE_SIZE,
        'Tamaño de archivo máximo: 1MB'
      ),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPass'],
  });

export { professionalInitialValues, professionalSchema };
