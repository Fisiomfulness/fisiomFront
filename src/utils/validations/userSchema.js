import { z } from 'zod';
import { nameRegex } from '../regExp';
import { isDateOnRange } from '../helpers';
import { zodStrRequired } from './index';

const initialValues = {
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
    name: zodStrRequired()
      .regex(nameRegex, 'Debe contener solo letras')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(30, 'No mas de 30 caracteres'),
    email: zodStrRequired().email('No es un email'),
    dateOfBirth: zodStrRequired().refine(
      (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
      `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`
    ),
    gender: z.enum(genderList, { message: 'Seleccione un genero' }),
    password: zodStrRequired()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'No mas de 50 caracteres'),
    repitPass: zodStrRequired(),
  })
  .refine((data) => data.password === data.repitPass, {
    message: 'Las contraseñas deben coincidir',
    path: ['repitPass'],
  });

export { initialValues, userSchema };
