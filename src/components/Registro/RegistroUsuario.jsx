"use client";

import React, { useEffect, useState } from "react";
import CustomInput from "@/features/ui/components/CustomInput/CustomInput";
import CustomButton from "@/features/ui/components/CustomButton/CustomButton";
import { registerForm } from "@/services/register";
import toast from "react-hot-toast";
import Link from "next/link";

function RegistroUsuario() {
  const [response, setResponse] = useState(undefined);

  const [errMsgpass, setErrMsgpass] = useState("");

  const [isInvalid, setIsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    repitPass: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const classNames = {
    innerWrapper: "w-[300px]",
    inputWrapper: "border-none !bg-zinc-100 my-5",
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
      toast.error(res.data.message);
    } else {
      toast.success("Registrado con exito!");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, repitPass } = e.target;

    const draft = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      repitPass: !repitPass.value.trim(),
    };

    if (Object.values(draft).every((value) => value === false)) {
      if (password.value !== repitPass.value) {
        setIsInvalid({ ...isInvalid, repitPass: true }); // Set repitPass error
        setErrMsgpass("Las contraseñas no coinciden");
      } else {
        setErrMsgpass("");
        registerResponse();
      }
    } else {
      // Set error messages for empty fields
      setIsInvalid({
        ...isInvalid,
        name: !formData.name.trim(),
        email: !formData.email.trim(),
        password: !formData.password.trim(),
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
          errorMessage={isInvalid.name ? "Nombre es requerido" : ""} // Set error based on isInvalid state
          onChange={handleChange}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          classNames={classNames}
          errorMessage={isInvalid.email ? "Email es requerido" : ""}
          onChange={handleChange}
        />
        <CustomInput
          name="password"
          placeholder="Contraseña"
          type="password"
          classNames={classNames}
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

export default RegistroUsuario;
