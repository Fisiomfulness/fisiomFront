"use client";

import { sendConfirmacion } from "@/services/confirmarEmail";
import { Button } from "@nextui-org/react";

const ConfirmEmail = ({ token }) => {
  const handleClick = () => {
    sendConfirmacion(token.params.token);
  };
  return <Button onClick={handleClick}>Confirmar email</Button>;
};

export default ConfirmEmail;
