"use client";

import {
  CustomButton,
  CustomInput,
  CustomModal,
  CustomModalBody,
  CustomModalFooter,
  CustomModalHeader,
  CustomAlert,
} from "@/features/ui";
import { Select, SelectItem, Link } from "@nextui-org/react";
import { useState } from "react";

const Step = Object.freeze({
  first: 0,
  second: 1,
});

export default function Selector() {
  const defaultValue = "Seleccione una opcion";
  const [state, setState] = useState(defaultValue);
  const [message, setMessage] = useState("");

  const [step, setStep] = useState(-1);

  return (
    <div className="w-full flex flex-row justify-between flex-wrap gap-4 pt-4">
      <Select
        variant="flat"
        radius="sm"
        labelPlacement={"outside"}
        placeholder={defaultValue}
        className="max-w-[200px]"
        color="primary"
        aria-label={defaultValue}
        selectedKeys={[state]}
        disabledKeys={[defaultValue]}
        onChange={(e) => {
          setMessage(`Desea ${e.target.value} esta cita?`);
          setState(e.target.value);
        }}
        classNames={{
          trigger: "bg-primary-300",
          value: "text-black",
          selectorIcon: "text-black",
        }}
        popoverProps={{
          radius: "sm",
          shadow: "sm",
          size: "sm",
          offset: 2,
          classNames: {
            content: "p-0 bg-[#D8EEF8] shadow-none",
          },
        }}
        listboxProps={{
          itemClasses: {
            base: "first:hidden rounded-md",
          },
          color: "primary",
        }}
      >
        {[defaultValue, "Reprogramar", "Cancelar"].map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      {state !== defaultValue && (
        <div className="flex flex-row gap-2">
          <CustomButton
            color="secondary"
            className="w-28"
            onPress={() => setStep(Step.first)}
          >
            Aceptar
          </CustomButton>
          <CustomButton
            color="primary"
            className="w-28"
            onPress={() => setState(defaultValue)}
          >
            Cancelar
          </CustomButton>
        </div>
      )}
      <CustomAlert
        isOpen={step === Step.first}
        onOpenChange={() => setStep(-1)}
        status="question"
        onAccept={() => setStep(Step.second)}
        onCancel={() => setStep(-1)}
        isDismissable
      >
        <p className="text-center">{message || "No se ha seleccionado"}</p>
      </CustomAlert>
      <CustomModal
        isOpen={step === Step.second}
        onOpenChange={() => setStep(-1)}
        className="gap-2"
      >
        <CustomModalHeader className="underline font-bold">
          Iniciar sesión
        </CustomModalHeader>
        <CustomModalBody className="items-start">
          <CustomInput
            autoFocus
            label="Correo electrónico"
            variant="bordered"
          />
          <CustomInput label="Contraseña" type="password" variant="bordered" />
          <Link color="primary" href="#" size="sm" className="px-1 py-2">
            ¿Has olvidado la contraseña?
          </Link>
        </CustomModalBody>
        <CustomModalFooter className="flex-row gap-2">
          <CustomButton color="secondary" onPress={() => setStep(-1)}>
            Cerrar
          </CustomButton>
          <CustomButton color="primary" onPress={() => setStep(-1)}>
            Ingresar
          </CustomButton>
        </CustomModalFooter>
      </CustomModal>
    </div>
  );
}
