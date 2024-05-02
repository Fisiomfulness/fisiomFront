import { useState } from "react";

import {
  Button,
  Select,
  SelectItem,
  Input,
  DateInput,
} from "@nextui-org/react";
import { ErrorMessage, Field } from "formik";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { actualMinDate } from "@/utils/helpers";

export const genderList = [
  { label: "Femenino", value: "Femenino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Prefiero no responder", value: "Prefiero no responder" },
];

export const InputsFormRegister = ({ handleChange, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <>
        <Input
          isRequired
          name="name"
          type="string"
          variant="underlined"
          label="Nombre"
          placeholder="Coloca tu nombre"
          onChange={handleChange}
          size="lg"
        />
        {errors.name && (
          <span className="text-danger-500 text-xs">{errors.name}</span>
        )}
      </>

      <>
        <Input
          isRequired
          name="phone"
          type="string"
          variant="underlined"
          label="telefono"
          placeholder="Coloca tu telefono"
          onChange={handleChange}
          size="lg"
        />
        {errors.phone && (
          <span className="text-danger-500 text-xs">{errors.phone}</span>
        )}
      </>

      <>
        <Input
          isRequired
          name="email"
          type="email"
          variant="underlined"
          label="Email"
          placeholder="Enter your email"
          onChange={handleChange}
          size="lg"
        />
        {errors.email && (
          <span className="text-danger-500 text-xs">{errors.email}</span>
        )}
      </>

      <div className="flex flex-col gap-1">
        <Input
          isRequired
          name="dateOfBirth"
          variant="underlined"
          type="date"
          onChange={handleChange}
          placeholder="Fecha de nacimiento"
        />
        {errors.dateOfBirth && (
          <span className="text-danger-500 text-xs">{errors.dateOfBirth}</span>
        )}
      </div>

      <>
        <Select
          isRequired
          name="gender"
          placeholder="Seleccione un genero"
          label="genero"
          variant="underlined"
          items={genderList}
          onChange={handleChange}
        >
          {(gender) => (
            <SelectItem key={gender.value}>{gender.label}</SelectItem>
          )}
        </Select>
        {errors.gender && (
          <span className="text-danger-500 text-xs">{errors.gender}</span>
        )}
      </>

      <>
        <Input
          isRequired
          name="password"
          label="Password"
          variant="underlined"
          placeholder="Coloca tu contraseña"
          onChange={handleChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        {errors.password && (
          <span className="text-danger-500 text-xs">{errors.password}</span>
        )}
      </>

      <>
        <Input
          isRequired
          name="repitPass"
          label="constraseña"
          variant="underlined"
          placeholder="Coloca tu contraseña"
          onChange={handleChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        {errors.repitPass && (
          <span className="text-danger-500 text-xs">{errors.repitPass}</span>
        )}
      </>
    </>
  );
};
