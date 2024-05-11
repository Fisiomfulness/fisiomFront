import { useState } from "react";

import { CustomInput } from "@/features/ui";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { Button } from "react-aria-components";
import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";
import FileUpload from "./FileUpload";

export const genderList = [
  { label: "Femenino", value: "Femenino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Prefiero no responder", value: "Prefiero no responder" },
];

export const InputsFormRegister = ({
  handleChange,
  handleBlur,
  touched,
  values,
  errors,
  isSubmitting,
  isCurriculum,
  isUpdate,
  submitButonMessage,
  listInputsValue,
  setFieldValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      {listInputsValue(errors, touched).map((inputValue, index) => {
        // console.log(listInputsValue());

        return (
          <div key={index}>
            {index % 2 === 0 && ( // Check if index is even (divisible by 2)
              <div className="flex gap-2 flex-col sm:flex-row w-full justify-between">
                {/* Render the current and next input (if it exists) */}
                {isUpdate ? (
                  <CustomInput
                    {...inputValue} // Spread all properties from inputValue
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "!bg-[#F4F4F4] !border-1 border-transparent",
                    }}
                    isClearable
                    onClear={() => setFieldValue(inputValue.name, "")}
                  />
                ) : (
                  <CustomInput
                    {...inputValue} // Spread all properties from inputValue
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "!bg-[#F4F4F4] !border-1 border-transparent",
                    }}
                  />
                )}

                {listInputsValue(errors, touched)[index + 1] && (
                  <CustomInput
                    {...listInputsValue(errors, touched)[index + 1]} // Spread properties from next input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="lg"
                    classNames={{
                      inputWrapper:
                        "!bg-[#F4F4F4] !border-1 border-transparent",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      <Select
        name="gender"
        label="Genero"
        variant="flat"
        items={genderList}
        selectedKeys={[values.gender]}
        isInvalid={errors.gender ? true : false}
        errorMessage={errors.gender}
        onChange={handleChange}
        size="lg"
        radius="sm"
        classNames={{
          innerWrapper: "text-gray-500",
          label: "text-gray-500",
          errorMessage: "text-sm",
        }}
      >
        {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
      </Select>

      <div className="flex flex-col sm:flex-row gap-1 w-full justify-between">
        <CustomInput
          name="password"
          aria-label="Contraseña"
          autocomplete="new-password"
          variant="flat"
          placeholder="Contraseña"
          size="lg"
          value={values.password}
          isInvalid={touched.password && errors.password ? true : false}
          errorMessage={touched.password && errors.password}
          onBlur={handleBlur}
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
          classNames={{
            inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
          }}
        />

        <CustomInput
          name="confirmPass"
          aria-label="Repita la contraseña"
          autocomplete="repeat-password"
          variant="flat"
          placeholder="Repita la contraseña"
          size="lg"
          value={values.confirmPass}
          isInvalid={touched.confirmPass && errors.confirmPass ? true : false}
          errorMessage={touched.confirmPass && errors.confirmPass}
          onBlur={handleBlur}
          onChange={handleChange}
          type="password"
          classNames={{
            inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
          }}
        />
      </div>
      <Divider />

      {isCurriculum ? <FileUpload name="curriculum" /> : <></>}
      <Button
        className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
        type="submit"
        isDisabled={Object.keys(errors).length > 0 || isSubmitting}
      >
        {submitButonMessage}
      </Button>
    </>
  );
};
