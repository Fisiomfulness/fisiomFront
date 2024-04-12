"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "@/features/ui/components/CustomInput/CustomInput";
import CustomButton from "@/features/ui/components/CustomButton/CustomButton";
import { registerForm } from "@/services/register";

function RegistroProfesional() {
  const [isSubmit, setIsSubmit] = useState(false);

  const [file, setFile] = useState(null);

  const [response, setResponse] = useState(undefined);

  const [responseError, setResponseError] = useState("");

  const [errMsgpass, setErrMsgpass] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    license: "",
    city: "",
    curriculum: "",
    role: "profesional", // Pre-fill role for clarity
  });
  const [isInvalid, setIsInvalid] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
    repitPass: false,
    license: false,
    city: false,
    curriculum: false,
  });

  const classNames = {
    innerWrapper: "w-[300px]",
    inputWrapper: "border-none !bg-zinc-100 my-3",
  };

  useEffect(() => {
    const fetchData = () => {
      if (response) {
        // Check if response exists before fetching
        console.log(response);
      }
    };
    fetchData();
  }, [response]); // Dependency array: re-run on response changes

  const registerResponse = async () => {
    const res = await registerForm(formData);
    setResponse(res);

    if (res.status == "201") {
      setResponseError(res.data.message);
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
      setResponseError("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Update isInvalid state based on input value
    setIsInvalid({
      ...isInvalid,
      [name]: !value.trim(), // Validate trimmed value
    });
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(false);

    const { password, repitPass } = e.target;

    const draft = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      repitPass: !repitPass.value.trim(),
      license: !formData.license.trim(),
      city: !formData.city.trim(),
      // curriculum: !formData.curriculum.trim(),
    };

    if (Object.values(draft).every((value) => value === false)) {
      if (password.value !== repitPass.value) {
        setIsInvalid({ ...isInvalid, repitPass: true });
        setErrMsgpass("Las contraseñas no coinciden");
      } else {
        setErrMsgpass("");
        console.log(formData);
        registerResponse();
      }
    } else {
      // Set error messages for empty fields
      setIsInvalid({
        ...isInvalid,
        name: !formData.name.trim(),
        phone: !formData.phone.trim(),
        email: !formData.email.trim(),
        password: !formData.password.trim(),
        repitPass: !repitPass.value.trim(),
        license: !formData.license.trim(),
        city: !formData.city.trim(),
        // curriculum: !formData.curriculum.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CustomInput
          name="name"
          placeholder="Nombre completo"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.name}
          errorMessage={isInvalid.name ? "Nombre es requerido" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="phone"
          placeholder="Telefono"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.phone}
          errorMessage={isInvalid.phone ? "Telefono es requerido" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          classNames={classNames}
          isInvalid={isInvalid.email}
          errorMessage={isInvalid.email ? "Email es requerido" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="password"
          placeholder="Contraseña"
          type="password"
          classNames={classNames}
          isInvalid={isInvalid.password}
          errorMessage={isInvalid.password ? "Contraseña es requerida" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="repitPass"
          placeholder="Repita contraseña"
          type="password"
          classNames={classNames}
          isInvalid={isInvalid.repitPass}
          errorMessage={errMsgpass} // Specific error for repeat password
          onChange={handleChange}
        />
        <CustomInput
          name="license"
          placeholder="Numero colegiado"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.license}
          errorMessage={isInvalid.license ? "Licencia es requerida" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="city"
          placeholder="Ciudad"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.city}
          errorMessage={isInvalid.city ? "City es requerida" : ""}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-between items-center mt-4 rounded">
          {(file?.name && <p>{file?.name}</p>) || (
            <p>Agregar diploma o curriculum</p>
          )}
          <div>
            <label
              htmlFor="curriculum"
              className="p-3 bg-primary text-white cursor-pointer border rounded-lg hover:bg-sky-500"
            >
              AGREGAR
            </label>
            <CustomInput
              type="file"
              id="curriculum"
              placeholder="asdas"
              className="hidden"
              onChange={onChangeFile}
              isInvalid={isInvalid.curriculum}
            />
          </div>
        </div>
        <p className="text-red-500 text-sm">
          {isInvalid.curriculum ? "Requerido" : ""}
        </p>
        {isSubmit ? <p className="text-green-600">Perfil creado</p> : <></>}
        {<p className="text-red-600">{responseError}</p>}
        <CustomButton color="primary" type="submit" className="mt-4 w-full">
          Crear perfil
        </CustomButton>
      </div>
    </form>
  );
}

export default RegistroProfesional;
