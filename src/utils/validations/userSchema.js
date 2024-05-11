import { z } from "zod";
import { isDateOnRange } from "../helpers";
import { cityRegex, nameRegex, numericRegex, phoneRegExp } from "../regExp";
import { zodStrRequired } from "./index";

const userInitialValues = {
  name: "",
  email: "",
  dateOfBirth: "",
  password: "",
  confirmPass: "",
  gender: "",
  streetName: "",
  streetNumber: "",
  floorAppartment: "", // ? Opcional
  city: "",
  state: "", // ? Opcional
  country: "",
};

const genderList = ["Femenino", "Masculino", "Prefiero no responder"];
const acceptedYears = { min: 18, max: 100 };

const userSchema = z
  .object({
    name: zodStrRequired()
      .regex(nameRegex, "Debe contener solo letras")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(30, "No mas de 30 caracteres"),
    phone: zodStrRequired().regex(phoneRegExp, "No es un teléfono valido"),
    email: zodStrRequired().email("No es un email"),
    dateOfBirth: z
      .string()
      .date("No es una fecha valida")
      .refine(
        (value) => isDateOnRange(value, acceptedYears.min, acceptedYears.max),
        `Debes tener mas de ${acceptedYears.min} y menos de ${acceptedYears.max} años`,
      ),
    gender: z.enum(genderList, { message: "Seleccione un genero" }),
    password: zodStrRequired()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(50, "No mas de 50 caracteres"),
    confirmPass: zodStrRequired(),
    streetName: zodStrRequired()
      .min(2, "La calle debe tener al menos 2 caracteres")
      .max(50, "No mas de 50 caracteres")
      .regex(nameRegex, "Solo puede contener letras"),
    streetNumber: zodStrRequired()
      .max(8, "No puede tener mas de 8 dígitos")
      .regex(numericRegex, "Debe ser numérico"),
    floorAppartment: z
      .string()
      .max(5, "No puede tener mas de 5 dígitos")
      .regex(numericRegex, "Debe ser numérico")
      .optional()
      .or(z.literal("")),
    city: zodStrRequired()
      .min(2, "La ciudad debe tener al menos 2 caracteres")
      .max(50, "No puede contener mas de 50 caracteres")
      .regex(
        cityRegex,
        "El nombre de la ciudad solo puede contener letras y espacios",
      ),
    state: z
      .string()
      .min(2, "El estado debe tener al menos 2 caracteres")
      .max(50, "No puede contener mas de 50 caracteres")
      .regex(nameRegex, "Solo puede contener letras")
      .optional()
      .or(z.literal("")),
    country: zodStrRequired()
      .min(2, "El pais debe tener al menos 2 caracteres")
      .max(50, "No mas de 50 caracteres")
      .regex(nameRegex, "Solo puede contener letras"),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPass"],
  });

export { userInitialValues, userSchema };
