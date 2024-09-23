"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { apiEndpoints } from "@/api_endpoints";
import { deleteAccountFunction } from "@/app/api/accountActions/deleteAccount";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteAccount = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name ?? "";
  const id = session?.user?.id ?? "";
  const email = session?.user?.email ?? "";

  const [respond, setRespond] = useState("");
  const [password, setPassword] = useState("");
  const payload = {
    response: respond,
    password: password,
    email: email,
    name: name,
  };

  const handleAccount = async () => {
    if (!password || !respond) {
      toast.error("Faltan datos por completar");
    } else {
      const { data, error } = await deleteAccountFunction(id, payload);
      console.log(data);
      console.log(error);
      if (error) {
        toast.error(error);
      }
      if (data?.message === "User has been deleted") {
        toast.success("Has eliminado tu cuenta correctamente");
        signOut();
      }
    }
  };

  return (
    <div>
      <h1 className=" font-semibold mb-6">Eliminar tu cuenta</h1>
      <p className=" mb-2">
        Hola, <span className=" font-semibold">{name}</span>{" "}
      </p>
      <p className=" mb-2">Lamentamos que quieras Eliminar tu cuenta.</p>
      <p className=" mb-2">
        Si lo que quieres es tomarte un descanso, puedes{" "}
        <a
          href="/user/suspend_account"
          className="font-bold text-secondary-300"
        >
          suspender
        </a>{" "}
        temporalmente tu cuenta de Fisiom Fulness.
      </p>
      <hr className=" font-bold" />

      <div className=" flex flex-row mt-8 items-center">
        <p className=" w-[430px] font-bold">
          Por qué quieres eliminar tu cuenta?
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
        <p className=" w-[430px] font-bold">
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
        Si presionas el siguiente botón. tus fotos, comentarios, blogs,
        amistades y el resto de los datos se eliminaran definitivamente y no se
        podrán recuperar. Si en el futuro decides crear otra cuenta de Fisiom
        Fulness, no podrás registrarte con el mismo nombre de usuario,
      </p>

      <hr className=" font mb-10" />

      <Button
        color="danger"
        variant="solid"
        radius="sm"
        className=" font-semibold"
        type="button"
        onClick={() => {
          Swal.fire({
            title: "¿Estás seguro de eliminar tu cuenta?",
            text: "Al eliminar tu cuenta,  tus fotos, comentarios, blogs, amistades y el resto de los datos se eliminaran definitivamente y no sepodrán recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#218BB5",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar cuenta!",
          }).then((result) => {
            if (result.isConfirmed) {
              handleAccount();
            }
          });
        }}
      >
        Eliminar definitivamente mi cuenta
      </Button>
    </div>
  );
};

export default DeleteAccount;
