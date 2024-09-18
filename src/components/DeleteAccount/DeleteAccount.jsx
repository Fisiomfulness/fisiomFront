"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { apiEndpoints } from "@/api_endpoints";
import axios from "axios";
import { deleteUser } from "@/services/users";
import { deleteAccountFunction } from "@/app/api/accountActions/deleteAccount";

const DeleteAccount = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name ?? "";
  const id = session?.user?.id ?? "";
  const token = session?.user?.coordinates ?? "";

  const [message, setMessage] = useState("");
  const [respond, setRespond] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(true);

  console.log(message);
  console.log(id);
  console.log(token);

  useEffect(() => {
    const handleAccount = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      if (id) {
        const { data, error } = await deleteAccountFunction(id, token);
        console.log(data);
        console.log(error);
      }
    };
    if (id) {
      handleAccount();
    }
  }, [id]);

  const handleActive = () => {
    setActive(!active);
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
      >
        Eliminar definitivamente mi cuenta
      </Button>
    </div>
  );
};

export default DeleteAccount;

// const [loading, setLoading] = useState(false); // Nuevo estado de carga

// const handleDeleteAccount = async (userId) => {
//   try {
//     setLoading(true); // Inicia la carga
//     const response = await axios.delete(`${apiEndpoints}delete/${userId}`);
//     setMessage(response.data.message); // Cambia según la estructura de tu respuesta
//   } catch (error) {
//     setMessage("Hubo un error al eliminar la cuenta.");
//     console.error("Error deleting account:", error);
//   } finally {
//     setLoading(false); // Finaliza la carga
//   }
// };

// useEffect(() => {
//   if (id) {
//     handleDeleteAccount(id);
//   }
// }, [id]);

// useEffect(() => {
//   const deleteUser = async (id) => {
//     try {
//       const response = await axios.delete(`${apiEndpoints}delete/${id}`);
//       console.log(response.data);

//       setMessage(response.data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   if (id) {
//     deleteUser(session?.user?.id);
//     console.log("hola");
//   }
// }, []);

// setMessage(data.message);

// useEffect(() => {
//   const abortController = new AbortController();
//   const token = localStorage.getItem("token");
//   axios
//     .delete(`${apiEndpoints.users}delete`, {
//       signal: abortController.signal,
//       headers: {
//         Authorization: `Bearer ${token}`, // Así se configura el header de autorización
//       },
//       params: {
//         id: id,
//       },
//     })
//     .then(({ data }) => {
//       setMessage(data.message);
//     })
//     .catch((err) => {
//       if (err.name === "CanceledError") return;
//       throw err;
//     });
//   return () => abortController.abort();
// }, []);
