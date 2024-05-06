import * as Yup from 'yup';
import { nameRegex } from '../regExp';
import { isDateOnRange } from '../helpers';

const initialValues = {
  name: '',
  email: '',
  dateOfBirth: '',
  password: '',
  repitPass: '',
  gender: '',
  streetName: '',
  streetNumber: '',
  floorAppartment: '',
  city: '',
  state: '',
  country: ''
};

const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const yupRequired = Yup.string().required('Completa este campo');

const userSchema = Yup.object({
  name: yupRequired
    .matches(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  email: yupRequired.email('No es un email'),
  dateOfBirth: yupRequired.test(
    'is-date-on-range',
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max)
  ),
  gender: Yup.mixed()
    .required('Requerido')
    .oneOf(genderList, 'Seleccione un genero'),
  password: yupRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: yupRequired.oneOf(
    [Yup.ref('password')],
    'Las contraseñas deben coincidir'
  ),
  streetName: yupRequired
    .min(2, 'La calle debe tener al menos 2 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  streetNumber: yupRequired,
  city: yupRequired
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  country: yupRequired
    .min(2, 'El pais debe tener al menos 2 caracteres')
    .max(30, 'No mas de 30 caracteres'),
});

export { initialValues, userSchema };
