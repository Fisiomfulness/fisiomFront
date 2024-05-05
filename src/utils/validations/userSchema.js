import { z } from 'zod';
import { isDateOnRange } from '../helpers';
import { nameRegex } from '../regExp';
import { zodStrRequired } from './index';

const userInitialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  repitPass: '',
  gender: '',
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };

const userSchema = z
  .object({
    name: zodStrRequired('Requerido')
      .regex(nameRegex, 'Debe contener solo letras')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres'),
    email: zodStrRequired('Requerido').email('No es un email'),
    dateOfBirth: zodStrRequired('Requerido').refine(
      (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
      `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    ),
    gender: z.enum(genderList, { message: 'Seleccione un genero' }),
    password: zodStrRequired('Requerido')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'No mas de 50 caracteres'),
    repitPass: z.string().min(4),
  })
  .superRefine(({ repitPass, password }, ctx) => {
    if (repitPass !== password) {
      ctx.addIssue({
        path: ['repitPass'],
        message: 'La contraseña no coincide',
      });
    }
  });

export { userInitialValues, userSchema };
