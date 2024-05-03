import * as Yup from 'yup';
import { nameRegex } from '../regExp';

export const userRegisterInitialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  repitPass: '',
  gender: '',
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const yupRequired = Yup.string().required('Completa este campo');

export const userRegisterValidationScheme = Yup.object({
  name: yupRequired
    .matches(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  email: yupRequired.email('No es un email'),
  dateOfBirth: yupRequired.test(
    'is-date-on-range',
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
  ),
  gender: Yup.mixed()
    .required('Requerido')
    .oneOf(genderList, 'Seleccione un genero'),
  password: yupRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: yupRequired.oneOf(
    [Yup.ref('password')],
    'Las contraseñas deben coincidir',
  ),
});
