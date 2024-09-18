export const listInputsUser = (errors, touched) => {
  return [
    {
      name: "name",
      ariaLabel: "Nombre completo",
      label: "Nombre completo",
      errorMessage: touched.name && errors.name,
      isInvalid: touched.name && errors.name ? true : false,
    },

    {
      name: "email",
      ariaLabel: "Correo electrónico",
      label: "Correo electrónico",
      errorMessage: touched.email && errors.email,
      isInvalid: touched.email && errors.email ? true : false,
    },
    {
      name: "birthDate",
      ariaLabel: "Fecha de nacimiento",
      label: "Fecha de nacimiento",
      type: "date",
      errorMessage: touched.birthDate && errors.birthDate,
      isInvalid: touched.birthDate && errors.birthDate ? true : false,
    },
    {
      name: "city",
      ariaLabel: "Ciudad",
      label: "Ciudad",
      type: "text",
      errorMessage: touched.city && errors.city,
      isInvalid: touched.city && errors.city ? true : false,
    },
    {
      name: "state",
      ariaLabel: "Estado/Provincia",
      label: "Estado/Provincia",
      errorMessage: touched.state && errors.state,
      isInvalid: touched.state && errors.state ? true : false,
    },
    {
      name: "streetName",
      ariaLabel: "Calle",
      label: "Calle",
      errorMessage: touched.streetName && errors.streetName,
      isInvalid: touched.streetName && errors.streetName ? true : false,
    },
    {
      name: "streetNumber",
      ariaLabel: "Número",
      label: "Número",
      errorMessage: touched.streetNumber && errors.streetNumber,
      isInvalid: touched.streetNumber && errors.streetNumber ? true : false,
    },
    {
      name: "floorAppartment",
      ariaLabel: "Piso/Dpto",
      label: "Piso/Dpto",
      errorMessage: touched.floorAppartment && errors.floorAppartment,
      isInvalid:
        touched.floorAppartment && errors.floorAppartment ? true : false,
    },
  ];
};

// export const listInputsProfessional = (errors, touched) => { // If need more than 1 use it
//   return [
//     ...listInputsUser(errors, touched),
//     {
//       name: "license",
//       ariaLabel: "Numero de colegiado",
//       label: "Numero de colegiado",
//       type: "text",
//       errorMessage: touched.license && errors.license,
//       isInvalid: touched.license && errors.license ? true : false,
//     },
//   ];
// };
