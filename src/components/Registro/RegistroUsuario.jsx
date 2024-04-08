"use client";
import React, { useState } from "react";
import CustomInput from "@/features/ui/components/CustomInput/CustomInput";
import CustomButton from "@/features/ui/components/CustomButton/CustomButton";

function RegistroUsuario() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    name: false,
    pass: false,
    email: false,
    repitPass: false,
  });

  const classNames = {
    innerWrapper: "w-[300px]",
    inputWrapper: "border-none !bg-zinc-100 my-5",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, pass, repitPass } = e.target;

    const draft = {
      ...isInvalid,
      name: !name.value,
      pass: !pass.value,
      email: !email.value,
      repitPass: !repitPass.value,
    };

    if (Object.values(draft).every((value) => value === false)) {
      setIsSubmit(true);
      if (pass !== repitPass) {
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
        />

        {isSubmit ? <p className="text-green-600">Perfil creado</p> : <></>}
        <CustomButton type="submit">Crear perfil</CustomButton>
      </div>
    </form>
  );
}

export default RegistroUsuario;
