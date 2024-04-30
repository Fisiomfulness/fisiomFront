"use client";

import { useEffect, useState } from "react";
import { CustomButton, CustomInput, CustomLogo } from "@/features/ui";
import { Card, CardBody, RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import LoginProfesional from "./LoginProfesional";
import LoginUser from "./LoginUser";
import { useUser } from "@/hooks/useUser";

export const Login = () => {
  const { user, setUser } = useUser();
  const [selected, setSelected] = useState("usuario");

  return (
    <Card className="flex items-center h-auto w-full min-[440px]:w-4/5 md:w-[1028px] min-h-[512px]">
      <CardBody className="flex justify-between items-center w-full md:flex-row md:w-4/5">
        <div className="flex flex-col justify-center items-center">
          <Link href="/" className="pb-16">
            <CustomLogo width={220} color="dark" />
          </Link>
          <div className="flex justify-center">
            <RadioGroup
              className="font-semibold"
              label="Ingresa como:"
              value={selected}
              onValueChange={setSelected}
            >
              <Radio className="font-semibold text-lg" value="usuario">
                Usuario
              </Radio>
              <Radio className="font-semibold text-lg" value="profesional">
                Profesional
              </Radio>
            </RadioGroup>
          </div>
        </div>

        {selected === "usuario" ? <LoginUser /> : <LoginProfesional />}
      </CardBody>
    </Card>
  );
};
