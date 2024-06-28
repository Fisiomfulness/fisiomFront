import { z } from 'zod';
import { zodStrRequired } from './index';

const currentYear = new Date().getFullYear();

const experienceSchema = z.object({
  title: zodStrRequired('El titulo es requerido').max(
    50,
    'No mas de 50 caracteres'
  ),
  company: zodStrRequired('La compañía es requerida').max(
    25,
    'No mas de 25 caracteres'
  ),
  startDateMonth: z
    .number({
      coerce: true,
      required_error: 'Mes de inicio requerido',
      invalid_type_error: 'Debe ser un numero',
    })
    .int('Debe ser un entero')
    .refine((value) => value >= 1 && value <= 12, {
      message: 'No es un mes valido (1 a 12)',
    }),
  startDateYear: z
    .number({
      coerce: true,
      required_error: 'Año de inicio requerido',
      invalid_type_error: 'Debe ser un numero',
    })
    .int('Debe ser un numero entero')
    .min(currentYear - 100, `Mínimo: ${currentYear - 100}`)
    .max(currentYear, `Máximo: ${currentYear}`),
  endDateMonth: z
    .number({
      coerce: true,
      required_error: 'Mes de finalización requerido',
      invalid_type_error: 'Debe ser un numero',
    })
    .int('Debe ser un numero entero')
    .refine((value) => value >= 1 && value <= 12, {
      message: 'No es un mes valido (1 a 12)',
    })
    .or(z.literal('')),
  endDateYear: z
    .number({
      coerce: true,
      required_error: 'Año de finalización requerido',
      invalid_type_error: 'Debe ser un numero',
    })
    .int('Debe ser un numero entero')
    .min(currentYear - 100, `Mínimo: ${currentYear - 100}`)
    .max(currentYear, `Máximo: ${currentYear}`)
    .or(z.literal('')),
  description: zodStrRequired('La descripción es requerida').max(
    1000,
    'No mas de 1000 caracteres'
  ),
  current: z.boolean({
    required_error: 'Requerido',
    invalid_type_error: 'Debe ser true o false',
  }),
});

export { experienceSchema };
