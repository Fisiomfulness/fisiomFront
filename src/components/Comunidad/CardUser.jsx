"use client";
import { Button } from "@nextui-org/react";
import { MdLocationPin, MdChecklist } from "react-icons/md";
import { Avatar } from "@nextui-org/react";
import img from "../../../public/imgPerfil.png";

const CardUser = ({ user }) => {
  return (
    <div className="w-full flex bg-primary-100 rounded-sm p-2 sm:justify-around sm:pt-4 sm:pb-4">
      <div className="w-[80%] flex flex-col gap-2 sm:w-1/2">
        <div className="flex gap-2">
          <Avatar src={user.image || img.src} showFallback size="md" />
          <div className="relative flex flex-col gap-2 w-full">
            <h3 className="line-clamp-1">{user.name}</h3>
            <span className="text-sm absolute top-6 left-1">
              Edad: {user?.age || "not found"}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-sm gap-1">
          <div className="flex">
            <MdChecklist size="17px" color="#62CFE4" />
            <span className="ml-1">
              intereses: {user?.interests?.map((i) => i.name).join(", ")}
            </span>
          </div>
          <div className="flex">
            <MdLocationPin size="17px" color="#62CFE4" />
            <span className="ml-1"> ciudad: {user?.city}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button color="primary">Enviar Mensaje</Button>
      </div>
    </div>
  );
};

export default CardUser;
