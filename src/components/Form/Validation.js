const initialValues = {
  name: "",
  city: "",
  email: "",
  password: "",
  passwordRep: "",
  img: "",
};
const imgRegex = /\.(jpg|jpeg|png|gif|bmp)$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const name_length = 50;
const city_length = 50;

export const validation = (property, value, values = {}) => {
  const errors = { ...initialValues };

  switch (property) {
    // name validation
    case "name":
      if (!value.length) {
        errors.name = "Nombre requerido";
      } else if (value.length > name_length) {
        errors.name = `El nombre debe ser menor a ${name_length} caracteres`;
      }
      break;

    //city validation
    case "city":
      if (!value.length) {
        errors.city = "Ciudad requerida";
      } else if (value.length > city_length) {
        errors.city = `El nombre de la ciudad debe ser menor a ${city_length} caracteres`;
      }
      break;
    //email validation
    case "email":
      if (!value) {
        errors.email = "Email requerido";
      } else if (!emailRegex.test(value)) {
        errors.email = "No es un email valido";
      }
      break;
    //contraseña validation
    case "password":
      if (!value) {
        errors.password = "Contraseña requerida";
      } else if (!passwordRegex.test(value)) {
        errors.password =
          "No es una contraseña valida, minimo 6 caracteres, una mayuscula y un numero";
      }
      break;
    //contraseña repeticion validation
    case "passwordRep":
      if (!value) {
        errors.passwordRep = "Repita la contraseña";
      } else if (values.password !== value) {
        errors.passwordRep = "Las contraseñas no coinciden";
      }
      break;

    //validacion de imagen
    case "img":
      if (!imgRegex.test(value)) {
        errors.img = "La imagen debe ser .jpg, .speg, .png o .bmp";
      }
      break;
  }

  // console.log("> Debug: validation");
  // console.log("> errors", errors);
  return errors;
};
