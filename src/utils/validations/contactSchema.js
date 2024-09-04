import { z } from 'zod';
import { formikZodValidator } from "@/utils/validations";

const contactSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es requerido').max(50, 'Máximo 50 caracteres'),
  departamento: z.string().min(1, 'El departamento es requerido'),
  distrito: z.string().min(1, 'El distrito es requerido'),
  celular: z.string().trim().regex(/^\d+$/, 'Solo se permiten números').min(9, 'Debe tener al menos 9 dígitos'),
  email: z.string().email('Debe ser un email válido'),
  descripcion: z.string().optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar los términos y condiciones" }),
  }),
});

export { contactSchema };
