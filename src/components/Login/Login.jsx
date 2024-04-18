"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CustomButton, CustomInput, CustomLogo } from "@/features/ui";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/User";

export const Login = () => {
  const router = useRouter();

  const { setUser, user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login({ email, password });

    if (response) {
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      router.push("/");
    }
  };

  return (
    <div className="center bg-primary-400">
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

        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-2 max-w-xs w-full z-10">
            <CustomInput
              variant="flat"
              className={email.length > 0 && "pb-7"}
              isInvalid={!email.length} // TODO: mejorar la condicion
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              variant="flat"
              className={password.length > 0 && "pb-7"}
              isInvalid={!password.length} // TODO: mejorar la condicion
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CustomButton
              type="submit"
              isDisabled={!password.length || !email.length}
              className="bg-primary-400 mt-2"
              // as={Link}
              href="/"
            >
              LOGIN
            </CustomButton>

            <Link href="/recupero" className="w-full italic mt-1">
              Contraseña <strong>olvidada ?</strong>
            </Link>

            <div className="flex flex-row justify-center items-center gap-4 mt-8">
              <p>No tiene cuenta?</p>
              <CustomButton
                className="bg-primary-400 min-w-fit !w-fit py-2"
                as={Link}
                href="/registro"
              >
                Registrarse
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
