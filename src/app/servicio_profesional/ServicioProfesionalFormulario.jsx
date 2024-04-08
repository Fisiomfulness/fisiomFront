"use client";

import { useState } from "react";
import {
  CustomButton,
  CustomInput,
  CustomTextarea,
  CustomAlert,
} from "@/features/ui";

export default function SecondModal() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    servicio: false,
    precio: false,
    desc: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { servicio, precio, desc } = event.target;

    const draft = {
      ...isInvalid,
      servicio: !servicio.value,
      precio: !precio.value,
      desc: !desc.value,
    };

    if (Object.values(draft).every((value) => value === false)) {
      setIsSubmit(true);
      console.log("Submit");
    } else {
      setIsSubmit(false);
    }

    setIsInvalid(draft);
  };

  return (
    <div className="overflow-x-auto">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="flex flex-col gap-6 pt-4 w-80">
          <CustomInput
            name="servicio"
            defaultValue="***** *****"
            isInvalid={isInvalid.servicio}
            label="Servicio"
          />
          <CustomInput
            name="precio"
            defaultValue="***** *****"
            isInvalid={isInvalid.precio}
            label="Precio"
          />
          <CustomTextarea
            name="desc"
            defaultValue="***** *****"
            isInvalid={isInvalid.desc}
            label="Descripción"
            minRows={7}
          />
          <CustomButton color="primary" type="submit">
            Crear
          </CustomButton>
        </div>
      </form>
      <CustomAlert
        isOpen={isSubmit}
        onOpenChange={() => setIsSubmit(false)}
        status="success"
        onClose={() => setIsSubmit(false)}
      >
        <p>Servicio creado</p>
      </CustomAlert>
    </div>
  );
}
