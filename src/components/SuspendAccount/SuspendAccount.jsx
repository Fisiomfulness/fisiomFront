"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { apiEndpoints } from "@/api_endpoints";
import { suspendAccountFunction } from "@/app/api/accountActions/suspendActions";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function SuspendAccount() {
  const { data: session, status } = useSession();
  const name = session?.user?.name ?? "";
  const id = session?.user?.id ?? "";
  const email = session?.user?.email ?? "";

  const [respond, setRespond] = useState("");
  const [password, setPassword] = useState("");
  const [time, setTime] = useState("");
  const payload = {
    response: respond,
    password: password,
    email: email,
    name: name,
    time: time,
  };

  const timeList = [
    { label: "1 Mes", value: 1 },
    { label: "2 Meses", value: 2 },
    { label: "3 Meses", value: 3 },
    { label: "1 Año", value: 12 },
  ];

  const handleAccount = async () => {
    if (!password || !respond || !time) {
      toast.error("Faltan datos por completar");
    } else {
      const { data, error } = await suspendAccountFunction(id, payload);
      console.log(data);
      console.log(error);
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success("Has suspendido tu cuenta correctamente");
        signOut();
      }
    }
  };

  return (
    <div>
      <h1 className=" font-semibold mb-6">Suspender tu cuenta</h1>
      <p className=" mb-2">
        Hola, <span className=" font-semibold">{name}</span>{" "}
      </p>
      <p className=" mb-2">Lamentamos que quieras suspender tu cuenta.</p>
      <hr className=" font-bold" />

      <div className=" flex flex-row mt-8 items-center">
        <p className=" w-[440px] font-bold">
          Por qué quieres suspender tu cuenta?
        </p>
        <Input
          aria-label="¿Por Qué?"
          type="string"
          variant="bordered"
          radius="sm"
          size="sm"
          label="¿Por Qué?"
          className=" w-1/3"
          value={respond}
          onChange={(e) => setRespond(e.target.value)}
        />
      </div>
      <div className=" flex flex-row mt-5 items-center">
        <p className=" w-[440px] font-bold">
          Por cuanto tiempo deseas suspender tu cuenta?
        </p>

        <Select
          label="Tiempo"
          variant="bordered"
          items={timeList}
          size="sm"
          radius="sm"
          className=" w-1/3"
          onChange={(e) => setTime(e.target.value)}
        >
          {timeList.map((time) => (
            <SelectItem key={time.value}>{time.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className=" flex flex-row mt-5 items-center">
        <p className=" w-[440px] font-bold">
          Para continuar, vuelve a ingresar tu contraseña
        </p>
        <Input
          aria-label="Ingresa la contraseña"
          type="string"
          variant="bordered"
          radius="sm"
          size="sm"
          label="Ingresa la contraseña"
          className=" w-1/3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-row mt-8 mb-8">
        <a
          className="text-sm hover:underline text-secondary-300"
          href="/password_olvidada"
        >
          ¿Olvidaste{" "}
          <span className="font-bold text-secondary-300">tu contraseña?</span>
        </a>
      </div>

      <p className=" mb-6">
        Si decides suspender tu cuenta, tu perfil, blogs, comentarios, y
        amistades estarán ocultos temporalmente. Durante este tiempo, tus datos
        no serán accesibles para otros usuarios, pero no se eliminarán. Podrás
        reactivar tu cuenta en cualquier momento iniciando sesión nuevamente. Si
        no reactivas tu cuenta, permanecerá suspendida hasta que decidas volver.
      </p>

      <hr className=" font mb-10" />

      <Button
        color="primary"
        radius="sm"
        className=" font-semibold"
        type="button"
        onClick={() => {
          Swal.fire({
            title: "¿Estás seguro de suspender tu cuenta?",
            text: "Al suspender tu cuenta, no recibirás notificaciones hasta que finalice el tiempo que estableciste.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#218BB5",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, suspender cuenta!",
          }).then((result) => {
            if (result.isConfirmed) {
              handleAccount();
            }
          });
        }}
      >
        Suspender temporalmente mi cuenta
      </Button>
    </div>
  );
}

export default SuspendAccount;
