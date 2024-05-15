export const listInputsUser = (errors, touched) => {
  return [
    {
      name: "name",
      ariaLabel: "Nombre completo",
      placeholder: "Nombre completo",
      type: "string",
      errorMessage: touched.name && errors.name,
      isInvalid: touched.name && errors.name ? true : false,
    },
    {
      name: "phone",
      ariaLabel: "Teléfono",
      placeholder: "Teléfono (sin espacios)",
      type: "string",
      errorMessage: touched.phone && errors.phone,
      isInvalid: touched.phone && errors.phone ? true : false,
    },
    {
      name: "email",
      ariaLabel: "Correo electrónico",
      placeholder: "Correo electrónico",
      type: "email",
      errorMessage: touched.email && errors.email,
      isInvalid: touched.email && errors.email ? true : false,
    },
    {
      name: "dateOfBirth",
      ariaLabel: "Fecha de nacimiento",
      placeholder: "inside",
      type: "date",
      errorMessage: touched.dateOfBirth && errors.dateOfBirth,
      isInvalid: touched.dateOfBirth && errors.dateOfBirth ? true : false,
    },
    {
      name: "country",
      ariaLabel: "País",
      placeholder: "País",
      type: "text",
      errorMessage: touched.country && errors.country,
      isInvalid: touched.country && errors.country ? true : false,
    },
    {
      name: "city",
      ariaLabel: "Ciudad",
      placeholder: "Ciudad",
      type: "text",
      errorMessage: touched.city && errors.city,
      isInvalid: touched.city && errors.city ? true : false,
    },
    {
      name: "state",
      ariaLabel: "Estado/Provincia",
      placeholder: "Estado/Provincia",
      type: "text",
      errorMessage: touched.state && errors.state,
      isInvalid: touched.state && errors.state ? true : false,
    },
    {
      name: "streetName",
      ariaLabel: "Calle",
      placeholder: "Calle",
      type: "text",
      errorMessage: touched.streetName && errors.streetName,
      isInvalid: touched.streetName && errors.streetName ? true : false,
    },
    {
      name: "streetNumber",
      ariaLabel: "Número",
      placeholder: "Número",
      type: "text",
      errorMessage: touched.streetNumber && errors.streetNumber,
      isInvalid: touched.streetNumber && errors.streetNumber ? true : false,
    },
    {
      name: "floorAppartment",
      ariaLabel: "Piso/Dpto",
      placeholder: "Piso/Dpto",
      type: "text",
      errorMessage: touched.floorAppartment && errors.floorAppartment,
      isInvalid: touched.floorAppartment && errors.floorAppartment ? true : false,
    },
  ];
};

// export const listInputsProfessional = (errors, touched) => { // If need more than 1 use it
//   return [
//     ...listInputsUser(errors, touched),
//     {
//       name: "license",
//       ariaLabel: "Numero de colegiado",
//       placeholder: "Numero de colegiado",
//       type: "text",
//       errorMessage: touched.license && errors.license,
//       isInvalid: touched.license && errors.license ? true : false,
//     },
//   ];
// };
