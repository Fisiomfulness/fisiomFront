import { z } from 'zod';
import { nameRegex } from '../regExp';
import { isDateOnRange } from '../helpers';

const initialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  repitPass: '',
  gender: '',
};

const zodRequired = z.string().min(1, 'Completa este campo');
const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };

const userSchema = z.object({
  name: zodRequired
    .regex(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  email: zodRequired.email('No es un email'),
  dateOfBirth: zodRequired.refine(
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`
  ),
  gender: z.enum(genderList, { message: 'Seleccione un genero' }),
  password: zodRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: zodRequired.refine(
    (value, context) => value === context['password'],
    'Las contraseñas deben coincidir'
  ),
});

export { initialValues, userSchema };
