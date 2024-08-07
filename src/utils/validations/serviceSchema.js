import { z } from 'zod';
import { zodStrRequired } from './index';

const serviceInitialValues = {
  title: '',
  price: '',
  description: '',
};

const TITLE_LENGTH = {
  min: 3,
  max: 100,
};

const DESCRIPTION_LENGTH = {
  min: 10,
  max: 800,
};

const PRICE_INTERVAL = {
  // * Soles peruanos
  min: 50,
  max: 120,
};

const serviceSchema = z.object({
  title: zodStrRequired()
    .min(TITLE_LENGTH.min, `Debe tener mas de ${TITLE_LENGTH.min} caracteres`)
    .max(
      TITLE_LENGTH.max,
      `No puede tener mas de ${TITLE_LENGTH.max} caracteres`
    ),
  description: zodStrRequired()
    .min(
      DESCRIPTION_LENGTH.min,
      `Debe tener al menos ${DESCRIPTION_LENGTH.min} caracteres`
    )
    .max(
      DESCRIPTION_LENGTH.max,
      `No puede tener mas de ${DESCRIPTION_LENGTH.max} caracteres`
    ),
  price: z
    .number({
      coerce: true,
      invalid_type_error: 'Debe ser numérico',
    })
    .min(
      PRICE_INTERVAL.min,
      `El precio debe ser como mínimo ${PRICE_INTERVAL.min} (PEN)`
    )
    .max(
      PRICE_INTERVAL.max,
      `El precio no puede exceder de ${PRICE_INTERVAL.max} (PEN)`
    ),
  duration: z
    .number({
      coerce: true,
      invalid_type_error:
        'La duración debe ser un numero (Cantidad de minutos)',
    })
    .nonnegative('La duración debe ser un numero positivo')
    .int('La duración debe ser un numero entero (Minutos)')
    .optional(),
});

export { serviceInitialValues, serviceSchema };
