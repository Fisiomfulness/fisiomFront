"use client";
import { Button, Input, Card, CardBody, Image } from "@nextui-org/react";
import CustomInput from "@/features/ui/components/CustomInput/CustomInput";
import { useState } from "react";
import { validation } from "./Validation";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const initialValues = {
  name: "",
  city: "",
  email: "",
  password: "",
  passwordRep: "",
  img: "",
};
function Form() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  // const [edit, setEdit] = useState(initialValues);
  const [input, setInput] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const draft = { ...input, [property]: value };
    setInput(draft);
    // setEdit({ ...edit, [property]: value });
    setErrors(validation(property, value, draft));
  };

  return (
    <div className="flex items-center">
      <Card className="max-w-full  w-[388px] h-[518px]">
        <CardBody className="flex flex-col justify-between h-full">
          <div>
            <CustomInput
              variant="flat"
              placeholder="Inserte su nombre"
              className={!errors.name && "pb-7"}
              isInvalid={errors.name}
              value={input.name}
              name="name"
              onChange={handleChange}
              errorMessage={errors.name}
            />
            <CustomInput
              variant="flat"
              placeholder="Inserte su ciudad"
              className={!errors.city && "pb-7"}
              errorMessage={errors.city}
              isInvalid={errors.city}
              value={input.city}
              name="city"
              onChange={handleChange}
            />
            <CustomInput
              variant="flat"
              placeholder="Inserte su email"
              className={!errors.email && "pb-7"}
              errorMessage={errors.email}
              isInvalid={errors.email}
              value={input.email}
              name="email"
              onChange={handleChange}
            />
            <CustomInput
              variant="flat"
              placeholder="Inserte su nueva contraseña"
              className={!errors.password && "pb-7"}
              errorMessage={errors.password}
              isInvalid={errors.password}
              value={input.password}
              name="password"
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <RiEyeOffFill className="text-2xl text-default-400" />
                  ) : (
                    <RiEyeFill className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <CustomInput
              variant="flat"
              placeholder="Repita su nueva contraseña"
              className={!errors.passwordRep && "pb-7"}
              errorMessage={errors.passwordRep}
              isInvalid={errors.passwordRep}
              value={input.passwordRep}
              name="passwordRep"
              onChange={handleChange}
              type={isVisible ? "text" : "password"}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <RiEyeOffFill className="text-2xl text-default-400" />
                  ) : (
                    <RiEyeFill className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <CustomInput
              variant="flat"
              placeholder="Foto"
              className={!errors.img && "pb-7"}
              errorMessage={errors.img}
              isInvalid={errors.img}
              value={input.img}
              name="img"
              onChange={handleChange}
            />
          </div>
          <div>
            <Button color="primary" className="w-full" radius="none">
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default Form;
