import { z } from 'zod';

const zodStrRequired = (message) => z.string().min(1, message);

const formikZodValidator = (schema) => {
  return (values) => {
    const result = schema.safeParse(values);
    if (result.success) return;
    const errors = {};
    result.error.issues.forEach((error) => {
      errors[error.path[0]] = error.message;
    });
    return errors;
  };
};

export { formikZodValidator, zodStrRequired };
