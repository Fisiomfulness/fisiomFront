"use client";

import { useState } from "react";
import Link from "next/link";
import { CustomButton, CustomInput, CustomLogo } from "@/features/ui";
import { center } from "@/styled-system/patterns";

const Recupero = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={center({ bg: "primary.400" })}>
      <img
        className="absolute bottom-0 left-0 h-1/2 max-sm:w-2/3 max-sm:h-auto"
        alt="logo_overlay"
        src="/logo_overlay.webp"
      />
      <div
        className={[
          "max-w-3xl w-full rounded-md bg-white max-sm:px-4 py-20",
          "flex flex-row max-sm:flex-col max-sm:gap-8 items-center justify-evenly",
        ].join(" ")}
      >
        <CustomLogo width="220" color="dark" />

        <div className="flex flex-col gap-2 max-w-xs w-full z-10">
          <CustomInput
            variant="flat"
            className={email.length > 0 && "pb-7"}
            isInvalid={email.length === 0} // TODO: falta la lógica de validación
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomButton className="bg-primary-400 mt-2" as={Link} href="/">
            ENVIAR
          </CustomButton>
          <Link href="/recupero" className="w-full italic mt-1">
            Ingrese su <strong>email</strong> para recuperar la{" "}
            <strong>contraseña</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recupero;
