"use client";

import React, { useState } from "react";
import { CustomButton, CustomInput, CustomTable } from "@/features/ui";
import { registerProfesionalForm } from "@/services/register";
import toast from "react-hot-toast";
import Link from "next/link";

function RegisterProfesional({ Condicions }) {
  const [errMsgpass, setErrMsgpass] = useState("");

  const [selectedFile, setSelectedFile] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "Masculino",
    password: "",
    license: "",
    city: "",
  });

  const classNames = {
    innerWrapper: "w-[300px]",
    inputWrapper: "border-none !bg-zinc-100 my-3",
  };

  const registerResponse = async () => {
    const newformData = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      newformData.append(key, value);
    }
    newformData.append("curriculum", selectedFile);

    await registerProfesionalForm(newformData);
  };

  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    const { password, repitPass } = e.target;

    if (Condicions()) {
      if (Object.values(formData).every((value) => value.trim().length != 0)) {
        const birthDate = new Date(Date.parse(formData.dateOfBirth)); // Convert to Date object
        const currentDate = new Date(); // Get current date
        const age = Math.floor(
          (currentDate.getTime() - birthDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365),
        ); // Calculate age in years

        if (age < 18) {
          toast.error("El Usuario debe ser mayor a 18 años");
        } else {
          if (password.value !== repitPass.value) {
            setErrMsgpass("Las contraseñas no coinciden");
            toast.error("Las contraseñas no coinciden");
          } else {
            setErrMsgpass("");
            registerResponse();
          }
        }
      } else {
        toast.error("Completa los campos correctamente");
      }
    } else {
      toast.error("Porfavor acepte los terminos y condiciones");
    }
  };

  return (
    <form onSubmit={handleSubmitRegister}>
      <div>
        <CustomInput
          name="name"
          value={formData.name}
          placeholder="Nombre completo"
          type="text"
          classNames={classNames}
          errorMessage={!formData.name.length ? "Nombre es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="phone"
          value={formData.phone}
          placeholder="Telefono"
          type="text"
          classNames={classNames}
          errorMessage={!formData.phone.length ? "Telefono es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="email"
          value={formData.email}
          placeholder="Email"
          type="email"
          classNames={classNames}
          errorMessage={!formData.email.length ? "Email es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="dateOfBirth"
          value={formData.birthDate}
          placeholder="Fecha de nacimiento"
          type="date"
          classNames={classNames}
          errorMessage={
            !formData.email.length ? "Fecha de nacimiento requerida" : ""
          }
          onChange={handleChangeInput}
        />
        <select
          defaultValue="Masculino"
          name="gender"
          onChange={handleChangeInput}
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Prefiero no responder">Prefiero no responder</option>
        </select>
        <CustomInput
          name="password"
          value={formData.password}
          placeholder="Contraseña"
          type="password"
          classNames={classNames}
          errorMessage={
            !formData.password.length ? "Contraseña es requerida" : ""
          }
          onChange={handleChangeInput}
        />
        <CustomInput
          name="repitPass"
          value={undefined}
          placeholder="Repita contraseña"
          type="password"
          classNames={classNames}
          errorMessage={errMsgpass} // Specific error for repeat password
        />
        <CustomInput
          name="license"
          value={formData.license}
          placeholder="Numero colegiado"
          type="text"
          classNames={classNames}
          errorMessage={!formData.license.length ? "Licencia es requerida" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="city"
          value={formData.city}
          placeholder="Ciudad"
          type="text"
          classNames={classNames}
          errorMessage={!formData.city.length ? "City es requerida" : ""}
          onChange={handleChangeInput}
        />
        <div className="flex flex-row justify-between items-center mt-4 rounded">
          {(selectedFile?.name && <p>{selectedFile?.name}</p>) || (
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
              value={undefined}
              name="curriculum"
              type="file"
              id="curriculum"
              className="hidden"
              onChange={onChangeFile}
            />
          </div>
        </div>
        <CustomButton type="submit">Registrarse</CustomButton>
        <div className="flex flex-row justify-center items-center gap-4 mt-8">
          <p>¿Ya esta registrado?</p>
          <CustomButton
            className="bg-primary-400 min-w-fit !w-fit py-2"
            as={Link}
            href="/login"
          >
            Ingresar
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default RegisterProfesional;
