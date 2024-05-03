import * as Yup from 'yup';
import { cityRegex, nameRegex, numericRegex, phoneRegExp } from '../regExp';

export const professionalRegisterInitialValues = {
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

const yupRequired = Yup.string().required('Completa este campo');
const genderList = ['Femenino', 'Masculino', 'Prefiero no responder'];
const acceptedYears = { min: 18, max: 100 };
const MAX_FILE_SIZE = 1048576; // ? 1MB

export const professionalRegisterValidationScheme = Yup.object({
  name: yupRequired
    .matches(nameRegex, 'Debe contener solo letras')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'No mas de 30 caracteres'),
  phone: yupRequired.matches(phoneRegExp, 'No es un teléfono valido'),
  email: yupRequired.email('No es un email'),
  dateOfBirth: yupRequired.test(
    'is-date-on-range',
    `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
    (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
  ),
  password: yupRequired
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'No mas de 50 caracteres'),
  repitPass: yupRequired.oneOf(
    [Yup.ref('password')],
    'Las contraseñas deben coincidir',
  ),
  gender: Yup.mixed()
    .required('Requerido')
    .oneOf(genderList, 'Seleccione un genero'),
  license: Yup.string()
    .notRequired()
    .min(3, 'El n° colegiado debe tener al menos 3 dígitos')
    .max(10, 'No puede tener mas de 10 dígitos')
    .matches(numericRegex, 'Debe ser numérico'),
  city: yupRequired
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'No puede contener mas de 50 caracteres')
    .matches(
      cityRegex,
      'El nombre de la ciudad solo puede contener letras y espacios',
    ),
  curriculum: Yup.mixed()
    .required('Suba un curriculum')
    .test('is-valid-type', 'No es un PDF', (value) =>
      isValidPdf(value && value.name.toLowerCase()),
    )
    .test(
      'is-valid-size',
      'Tamaño de archivo máximo: 1MB',
      (value) => value && value.size <= MAX_FILE_SIZE,
    ),
});
