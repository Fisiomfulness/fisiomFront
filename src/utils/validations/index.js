import { z } from 'zod';

const zodStrRequired = (message = 'Completa este campo') =>
  z.string().trim().min(1, message);

// ? Formik "validate" prop needs undefined on success or errors = { field: "message"} to work properly
const formikZodValidator = (schema) => {
  return (values) => {
    const result = schema.safeParse(values);
    if (result.success) return;
    const errors = {};
    result.error.issues.forEach((error) => {
      if (!errors[error.path[0]]) errors[error.path[0]] = error.message;
    });
    return errors;
  };
};

export { formikZodValidator, zodStrRequired };
