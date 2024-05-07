"use client";

import { CustomLogo } from "@/features/ui";
import { Button, Card, CardBody, Radio, RadioGroup } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { RegisterProfessional } from "./RegisterProfesional";
import { RegisterUser } from "./RegisterUsuario";

export const Register = () => {
  const [selected, setSelected] = useState("usuario");
  const [aceptoCondiciones, setAceptoCondiciones] = useState(false);
  const [recibirInformacion, setRecibirInformacion] = useState(false);

  const conditionsAccepted =
    aceptoCondiciones && recibirInformacion ? true : false;

  return (
    <Card className="grid md:grid-cols-[1.2fr,1fr] gap-6 md:gap-x-4 items-center justify-items-center p-6 md:p-10 md:py-20 rounded-sm w-full max-w-[1380px]">
      <CardBody className="center flex-col w-full p-0 gap-8 md:gap-16">
        <Link href="/">
          <CustomLogo width={220} color="dark" />
        </Link>

        <div className="flex justify-center">
          <RadioGroup
            className="font-semibold"
            label="Registrarse como:"
            value={selected}
            onValueChange={setSelected}
          >
            <Radio className="text-lg font-normal" value="usuario">
              Usuario
            </Radio>
            <Radio className="text-lg font-normal" value="profesional">
              Profesional
            </Radio>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2 w-full min-[480px]:w-2/3">
          <label className="text-[11px] flex gap-2">
            <input
              type="checkbox"
              checked={aceptoCondiciones}
              onChange={() => setAceptoCondiciones(!aceptoCondiciones)}
              className="size-5 cursor-pointer"
            />
            <span>
              Acepto los
              <a className="text-primary font-semibold hover:underline cursor-pointer">
                {" "}
                términos y condiciones{" "}
              </a>{" "}
              del servicio de FISIOMFULNESS. Declaro haber leído y entiendo la
              política de privacidad
            </span>
          </label>
          <label className="text-[11px] flex gap-2">
            <input
              type="checkbox"
              checked={recibirInformacion}
              onChange={() => setRecibirInformacion(!recibirInformacion)}
              className="size-5 cursor-pointer"
            />
            <span>
              Doy mi consentimiento y acepto recibir información sobre los{" "}
              <a className="text-primary font-semibold hover:underline cursor-pointer">
                servicios y novedades de FISIOMFULNESS. Qué significa esto?
              </a>
            </span>
          </label>
          <div className="flex flex-row justify-center items-center gap-4 mt-8">
            <p className="text-sm">¿Ya esta registrado?</p>
            <Button
              className="bg-primary-500 text-white rounded-md font-semibold"
              as={Link}
              href="/login"
            >
              Ingresar
            </Button>
          </div>
        </div>
      </CardBody>
      {selected === "usuario" ? (
        <RegisterUser conditionsAccepted={conditionsAccepted} />
      ) : (
        <RegisterProfessional conditionsAccepted={conditionsAccepted} />
      )}
    </Card>
  );
};
