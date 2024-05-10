export const listInputsUser = (error, touched) => {
  return [
    {
      name: "name",
      ariaLabel: "Nombre completo",
      placeholder: "Nombre completo",
      type: "string",
      errorMessage: error ? error.name : "",
      isInvalid: error && error.name ? true : false,
    },
    {
      name: "phone",
      ariaLabel: "Teléfono",
      placeholder: "Teléfono (sin espacios)",
      type: "string",
      errorMessage: error ? error.phone : "",
      isInvalid: error && error.phone ? true : false,
    },
    {
      name: "email",
      ariaLabel: "Correo electrónico",
      placeholder: "Correo electrónico",
      type: "email",
      errorMessage: error ? error.email : "",
      isInvalid: error && error.email ? true : false,
    },
    {
      name: "dateOfBirth",
      ariaLabel: "Fecha de nacimiento",
      placeholder: "inside",
      type: "date",
      errorMessage: error ? error.dateOfBirth : "",
      isInvalid: error && error.dateOfBirth ? true : false,
    },
    {
      name: "country",
      ariaLabel: "País",
      placeholder: "País",
      type: "text",
      errorMessage: error ? error.country : "",
      isInvalid: error && error.country ? true : false,
    },
    {
      name: "city",
      ariaLabel: "Ciudad",
      placeholder: "Ciudad",
      type: "text",
      errorMessage: error ? error.city : "",
      isInvalid: error && error.city ? true : false,
    },
    {
      name: "state",
      ariaLabel: "Estado/Provincia",
      placeholder: "Estado/Provincia",
      type: "text",
      errorMessage: error ? error.state : "",
      isInvalid: error && error.state ? true : false,
    },
    {
      name: "streetName",
      ariaLabel: "Calle",
      placeholder: "Calle",
      type: "text",
      errorMessage: error ? error.streetName : "",
      isInvalid: error && error.streetName ? true : false,
    },
    {
      name: "streetNumber",
      ariaLabel: "Número",
      placeholder: "Número",
      type: "text",
      errorMessage: error ? error.streetNumber : "",
      isInvalid: error && error.streetNumber ? true : false,
    },
    {
      name: "floorAppartment",
      ariaLabel: "Piso/Dpto",
      placeholder: "Piso/Dpto",
      type: "text",
      errorMessage: error ? error.floorAppartment : "",
      isInvalid: error && error.floorAppartment ? true : false,
    },
  ];
};

export const listInputsProfessional = (error, touched) => {
  return [
    ...listInputsUser(error, touched),
    {
      name: "license",
      ariaLabel: "Numero de colegiado",
      placeholder: "Numero de colegiado",
      type: "text",
      errorMessage: error ? error.license : "",
      isInvalid: error && error.license ? true : false,
    },
  ];
};
