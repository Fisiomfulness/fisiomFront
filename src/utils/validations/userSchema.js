import { z } from 'zod';
import { isDateOnRange } from '../helpers';
import { nameRegex } from '../regExp';
import { zodStrRequired } from './index';

const userInitialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  confirmPass: '',
  gender: '',
  streetName: '',
  streetNumber: '',
  floorAppartment: '',
  city: '',
  state: '',
  country: '',
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
    dateOfBirth: z
      .string()
      .date('No es una fecha valida')
      .refine(
        (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
        `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`
      ),
    gender: z.enum(genderList, { message: 'Seleccione un genero' }),
    password: zodStrRequired()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'No mas de 50 caracteres'),
    confirmPass: zodStrRequired(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPass'],
  });

// const userSchema = Yup.object({
//   name: yupRequired
//     .matches(nameRegex, 'Debe contener solo letras')
//     .min(3, 'El nombre debe tener al menos 3 caracteres')
//     .max(30, 'No mas de 30 caracteres'),
//   email: yupRequired.email('No es un email'),
//   dateOfBirth: yupRequired.test(
//     'is-date-on-range',
//     `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
//     (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max)
//   ),
//   gender: Yup.mixed()
//     .required('Requerido')
//     .oneOf(genderList, 'Seleccione un genero'),
//   password: yupRequired
//     .min(8, 'La contraseña debe tener al menos 8 caracteres')
//     .max(50, 'No mas de 50 caracteres'),
//   repitPass: yupRequired.oneOf(
//     [Yup.ref('password')],
//     'Las contraseñas deben coincidir'
//   ),
//   streetName: yupRequired
//     .min(2, 'La calle debe tener al menos 2 caracteres')
//     .max(50, 'No mas de 50 caracteres'),
//   streetNumber: yupRequired,
//   city: yupRequired
//     .min(2, 'La ciudad debe tener al menos 2 caracteres')
//     .max(50, 'No mas de 50 caracteres'),
//   country: yupRequired
//     .min(2, 'El pais debe tener al menos 2 caracteres')
//     .max(30, 'No mas de 30 caracteres'),
// });

export { userInitialValues, userSchema };
