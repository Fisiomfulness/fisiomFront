import { z } from 'zod';
import { isDateOnRange, isValidPdf } from '../helpers';
import {
  cityRegex,
  nameRegex,
  numericRegex,
  phoneRegExp,
  streetNameRegex,
} from '../regExp';
import { zodStrRequired } from './index';

const professionalInitialValues = {
  name: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: '',
  password: '',
  confirmPass: '',
  streetName: '',
  streetNumber: '',
  floorAppartment: '', // ? Opcional
  city: '',
  state: '', // ? Opcional
  country: '',
  consultationPrice: '',
  license: '', // ? Opcional
  curriculum: null,
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const MAX_CURRICULUM_SIZE = 1024 * 1024; // ? 1MB
const MAX_PICTURE_SIZE = 1024 * 1024 * 3; // ? 3MB

const professionalSchema = z
  .object({
    name: zodStrRequired()
      .min(3, 'Debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres')
      .regex(nameRegex, 'Debe contener solo letras'),
    phone: zodStrRequired().regex(phoneRegExp, 'No es un teléfono valido'),
    email: zodStrRequired().email('No es un email'),
    birthDate: z
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
    streetName: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No mas de 50 caracteres')
      .regex(streetNameRegex, 'Solo letras y números (Min: 2 letras)'),
    streetNumber: zodStrRequired()
      .max(8, 'No puede tener mas de 8 dígitos')
      .regex(numericRegex, 'Debe ser numérico'),
    floorAppartment: z
      .string()
      .trim()
      .min(1, 'Al menos 1 digito')
      .max(5, 'No puede tener mas de 5 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional()
      .or(z.literal('')),
    city: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(cityRegex, 'Solo puede contener letras y espacios'),
    state: z
      .string()
      .trim()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(nameRegex, 'Solo puede contener letras')
      .optional()
      .or(z.literal('')),
    country: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No mas de 50 caracteres')
      .regex(nameRegex, 'Solo puede contener letras'),
    consultationPrice: z
      .union([z.string(), z.number()])
      .refine((value) => !isNaN(Number(value)), { message: 'No es un número' })
      .refine((value) => value >= 0, { message: 'Debe ser un numero positivo' })
      .refine((value) => value <= 400, {
        message: 'No más de 400 soles peruanos',
      })
      .optional(),
    license: z
      .string()
      .trim()
      .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
      .max(10, 'No puede tener mas de 10 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional()
      .or(z.literal('')),
    curriculum: z
      .instanceof(File, 'Curriculum requerido')
      .refine(
        (value) => isValidPdf(value && value.name.toLowerCase()),
        'No es un PDF'
      )
      .refine(
        (value) => value && value.size <= MAX_CURRICULUM_SIZE,
        'Tamaño de archivo máximo: 1MB'
      ),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPass'],
  });

const updateProfessionalSchema = z
  .object({
    name: zodStrRequired()
      .min(3, 'Debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres')
      .regex(nameRegex, 'Debe contener solo letras'),
    phone: zodStrRequired().regex(phoneRegExp, 'No es un teléfono valido'),
    email: zodStrRequired().email('No es un email'),
    birthDate: z
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
    streetName: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No mas de 50 caracteres')
      .regex(streetNameRegex, 'Solo letras y números (Min: 2 letras)'),
    streetNumber: zodStrRequired()
      .max(8, 'No puede tener mas de 8 dígitos')
      .regex(numericRegex, 'Debe ser numérico'),
    floorAppartment: z
      .string()
      .trim()
      .min(1, 'Al menos 1 digito')
      .max(5, 'No puede tener mas de 5 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional()
      .or(z.literal('')),
    city: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(cityRegex, 'Solo puede contener letras y espacios'),
    state: z
      .string()
      .trim()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No puede contener mas de 50 caracteres')
      .regex(nameRegex, 'Solo puede contener letras')
      .optional()
      .or(z.literal('')),
    country: zodStrRequired()
      .min(2, 'Debe tener al menos 2 caracteres')
      .max(50, 'No mas de 50 caracteres')
      .regex(nameRegex, 'Solo puede contener letras'),
    consultationPrice: z
      .union([z.string(), z.number()])
      .refine((value) => !isNaN(Number(value)), { message: 'No es un número' })
      .refine((value) => value >= 0, { message: 'Debe ser un numero positivo' })
      .refine((value) => value <= 400, {
        message: 'No más de 400 soles peruanos',
      })
      .optional(),
    license: z
      .string()
      .trim()
      .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
      .max(10, 'No puede tener mas de 10 dígitos')
      .regex(numericRegex, 'Debe ser numérico')
      .optional()
      .or(z.literal('')),
    image: z
      .instanceof(File)
      .refine((value) => value.type.startsWith('image/'))
      .refine(
        (value) => value && value.size <= MAX_PICTURE_SIZE,
        'Tamaño de imagen máxima: 3MB'
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPass'],
  });

export {
  professionalInitialValues,
  professionalSchema,
  updateProfessionalSchema,
};
