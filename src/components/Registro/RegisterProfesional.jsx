"use client";

import { useEffect, useState } from "react";
import { registerForm } from "@/services/register";
import toast from "react-hot-toast";
import Link from "next/link";
import { CustomButton, CustomInput } from "@/features/ui";

function RegisterProfesional({ Condicions }) {
  const [file, setFile] = useState(null);

  const [response, setResponse] = useState(undefined);

  const [errMsgpass, setErrMsgpass] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
    license: "",
    city: "",
    // curriculum: "", // Pre-fill role for clarity
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
    formData.role = "profesional";
    const res = await registerForm(formData);
    setResponse(res);

    if (res.status == "201") {
      toast.error(res.data.message);
    } else {
      toast.success("Registrado con exito!");
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
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
          placeholder="Nombre completo"
          type="text"
          classNames={classNames}
          errorMessage={!formData.name.length ? "Nombre es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="phone"
          placeholder="Telefono"
          type="text"
          classNames={classNames}
          errorMessage={!formData.phone.length ? "Telefono es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          classNames={classNames}
          errorMessage={!formData.email.length ? "Email es requerido" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="dateOfBirth"
          placeholder="Fecha de nacimiento"
          type="date"
          classNames={classNames}
          errorMessage={
            !formData.email.length ? "Fecha de nacimiento requerida" : ""
          }
          onChange={handleChangeInput}
        />
        <CustomInput
          name="password"
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
          placeholder="Repita contraseña"
          type="password"
          classNames={classNames}
          errorMessage={errMsgpass} // Specific error for repeat password
          onChange={handleChangeInput}
        />
        <CustomInput
          name="license"
          placeholder="Numero colegiado"
          type="text"
          classNames={classNames}
          errorMessage={!formData.license.length ? "Licencia es requerida" : ""}
          onChange={handleChangeInput}
        />
        <CustomInput
          name="city"
          placeholder="Ciudad"
          type="text"
          classNames={classNames}
          errorMessage={!formData.city.length ? "City es requerida" : ""}
          onChange={handleChangeInput}
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
