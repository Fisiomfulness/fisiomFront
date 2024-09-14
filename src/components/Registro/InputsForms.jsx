import { useState } from "react";
import { useFormikContext } from "formik";
import { Input, Divider, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../CustomComponentForm/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../CustomComponentForm/EyeSlashFilledIcon";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import FileUpload from "./FileUpload";

// Lista de especialidades
const specialtyList = [
  { label: "Psicología", value: "Psicología" },
  { label: "Psiquiatría", value: "Psiquiatría" },
  { label: "Nutrición", value: "Nutrición" },
  { label: "Dermatología", value: "Dermatología" },
  { label: "Odontología", value: "Odontología" },
  { label: "Oftalmología", value: "Oftalmología" },
  { label: "Pediatría", value: "Pediatría" },
  { label: "Ginecología", value: "Ginecología" },
  { label: "Cardiología", value: "Cardiología" },
  { label: "Traumatología", value: "Traumatología" },
  { label: "Otorrinolaringología", value: "Otorrinolaringología" },
  { label: "Urología", value: "Urología" },
  { label: "Neurología", value: "Neurología" },
  { label: "Endocrinología", value: "Endocrinología" },
  { label: "Reumatología", value: "Reumatología" },
  { label: "Medicina general", value: "Medicina general" },
  { label: "Otras especialidades", value: "Otras especialidades" },
];

const genderList = [
  { label: "Femenino", value: "Femenino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Prefiero no responder", value: "Prefiero no responder" },
];

export const InputsFormRegister = ({
  isProfessional,
  isUpdate,
  submitButtonMessage,
  listInputsValue,
}) => {
  const {
    touched,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-2">
        {listInputsValue(errors, touched).map((inputValue, index) => {
          return (
            <div key={index}>
              <div className="flex gap-2 flex-col sm:flex-row w-full justify-between">
                <Input
                  {...inputValue}
                  size="md"
                  variant="bordered"
                  value={values[inputValue.name]}
                  radius="sm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  classNames={{
                    inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
                    label: "text-default-600 text-base",
                    input: "text-base",
                    errorMessage: "text-sm",
                  }}
                  isClearable={isUpdate}
                  onClear={
                    isUpdate
                      ? () => setFieldValue(inputValue.name, "")
                      : undefined
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* "género" visible para usuarios y profesional */}
      <Select
        name="gender"
        label="Género"
        variant="flat"
        items={genderList}
        selectedKeys={[values.gender]}
        isInvalid={errors.gender ? true : false}
        errorMessage={errors.gender}
        onChange={handleChange}
        size="lg"
        radius="sm"
        classNames={{
          inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
          label: "text-default-600 text-base",
          input: "text-base",
          errorMessage: "text-sm",
        }}
      >
        {genderList.map((gender) => (
          <SelectItem key={gender.value}>{gender.label}</SelectItem>
        ))}
      </Select>

      {/* "especialidad" solo si es un profesional */}
      {isProfessional ? (
        <Select
          name="specialty"
          label="Especialidad"
          variant="flat"
          selectedKeys={[values.specialty]}
          isInvalid={errors.specialty ? true : false}
          errorMessage={errors.specialty}
          onChange={handleChange}
          size="lg"
          radius="sm"
          className="w-full"
        >
          {specialtyList.map((specialty) => (
            <SelectItem key={specialty.value}>{specialty.label}</SelectItem>
          ))}
        </Select>
      ) : null}

      {isProfessional ? (
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            name="consultationPrice"
            aria-label="Precio de consulta"
            type="text"
            variant="bordered"
            radius="sm"
            size="md"
            label="Precio consulta (Soles)"
            value={values.consultationPrice}
            isInvalid={
              touched?.consultationPrice && errors.consultationPrice
                ? true
                : false
            }
            errorMessage={
              touched?.consultationPrice && errors.consultationPrice
            }
            onBlur={handleBlur}
            onChange={handleChange}
            classNames={{
              inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              label: "text-default-600 text-base",
              input: "text-base",
              errorMessage: "text-sm",
            }}
            startContent={
              <FaRegMoneyBillAlt size={18} className="text-secondary-400" />
            }
          />
          <Input
            name="license"
            aria-label="Número de colegiado"
            type="string"
            variant="bordered"
            radius="sm"
            label="Número de colegiado"
            value={values.license}
            isInvalid={touched?.license && errors.license ? true : false}
            errorMessage={touched?.license && errors.license}
            onBlur={handleBlur}
            onChange={handleChange}
            size="md"
            classNames={{
              inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
              label: "text-default-600 text-base",
              input: "text-base",
              errorMessage: "text-sm",
            }}
          />
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-2 w-full justify-between">
        <Input
          name="password"
          aria-label="Contraseña"
          autocomplete="new-password"
          variant="bordered"
          radius="sm"
          label="Contraseña"
          size="md"
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
            label: "text-default-600 text-base",
            input: "text-base",
            errorMessage: "text-sm",
          }}
        />

        <Input
          name="confirmPass"
          aria-label="Repita la contraseña"
          autocomplete="repeat-password"
          variant="bordered"
          radius="sm"
          label="Repita la contraseña"
          size="md"
          value={values.confirmPass}
          isInvalid={touched.confirmPass && errors.confirmPass ? true : false}
          errorMessage={touched.confirmPass && errors.confirmPass}
          onBlur={handleBlur}
          onChange={handleChange}
          type="password"
          classNames={{
            inputWrapper: "!bg-[#F4F4F4] !border-1 border-transparent",
            label: "text-default-600 text-base",
            input: "text-base",
            errorMessage: "text-sm",
          }}
        />
      </div>

      {isProfessional && !isUpdate ? (
        <>
          <Divider />
          <FileUpload name="curriculum" />
        </>
      ) : null}

      <Button
        className="bg-primary-500 mt-2 text-white uppercase font-semibold rounded-sm"
        type="submit"
        isDisabled={Object.keys(errors).length > 0 || isSubmitting}
        isLoading={isSubmitting}
      >
        {submitButtonMessage}
      </Button>
    </>
  );
};
