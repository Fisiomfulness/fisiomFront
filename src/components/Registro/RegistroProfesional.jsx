"use client";
import React, { useState } from "react";
import CustomInput from "@/features/ui/components/CustomInput/CustomInput";
import CustomButton from "@/features/ui/components/CustomButton/CustomButton";
function RegistroProfesional() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [isInvalid, setIsInvalid] = useState({
    name: false,
    tel: false,
    email: false,
    pass: false,
    repitPass: false,
    numCol: false,
    city: false,
    cv: false,
  });
  const classNames = {
    innerWrapper: "w-[300px]",
    inputWrapper: "border-none !bg-zinc-100 my-3",
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, tel, email, pass, repitPass, numCol, city, cv } = e.target;

    const draft = {
      ...isInvalid,
      name: !name.value,
      tel: !tel.value,
      email: !email.value,
      pass: !pass.value,
      repitPass: !repitPass.value,
      numCol: !numCol.value,
      city: !city.value,
      cv: !cv.value,
    };

    if (Object.values(draft).every((value) => value === false)) {
      if (pass.value !== repitPass.value) {
        setErrMsg("Las contraseñas no coinciden");
      } else {
        setErrMsg("");
        console.log("Submit");
        setIsSubmit(true);
      }
    } else {
      setIsSubmit(false);
    }
    setIsInvalid(draft);
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
        />
        <CustomInput
          name="tel"
          placeholder="Telefono"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.tel}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          classNames={classNames}
          isInvalid={isInvalid.email}
        />
        <CustomInput
          name="pass"
          placeholder="Contraseña"
          type="password"
          classNames={classNames}
          isInvalid={isInvalid.pass}
        />
        <CustomInput
          name="repitPass"
          placeholder="Repita contraseña"
          type="password"
          classNames={classNames}
          isInvalid={isInvalid.repitPass}
          errorMessage={errMsg}
        />
        <CustomInput
          name="numCol"
          placeholder="Numero colegiado"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.numCol}
        />
        <CustomInput
          name="city"
          placeholder="Ciudad"
          type="text"
          classNames={classNames}
          isInvalid={isInvalid.city}
        />
        <div className="flex flex-row justify-between items-center mt-4 rounded">
          {(file?.name && <p>{file?.name}</p>) || <p>Agregar diploma o cv</p>}
          <div>
            <label
              for="cv"
              className="p-3 bg-primary text-white cursor-pointer border rounded-lg hover:bg-sky-500"
            >
              AGREGAR
            </label>
            <CustomInput
              type="file"
              id="cv"
              placeholder="asdas"
              className="hidden"
              onChange={onChangeFile}
              isInvalid={isInvalid.cv}
            />
          </div>
        </div>
        <p className="text-red-500 text-sm">
          {isInvalid.cv ? "Requerido" : ""}
        </p>
        {isSubmit ? <p className="text-green-600">Perfil creado</p> : <></>}
        <CustomButton color="primary" type="submit" className="mt-4 w-full">
          Crear perfil
        </CustomButton>
      </div>
    </form>
  );
}

export default RegistroProfesional;
