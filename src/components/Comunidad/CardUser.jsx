"use client";
import { Button } from "@nextui-org/react";
import { MdLocationPin, MdChecklist } from "react-icons/md";
import img from "../../../public/imgPerfil.png";

const CardUser = ({ user }) => {
  return (
    <div className="w-full flex bg-primary-100 rounded-sm p-2 sm:justify-around sm:pt-4 sm:pb-4">
      <div className="w-[75%] flex flex-col gap-5 sm:w-1/2">
        <div className="flex gap-2">
          <div
            className="rounded-full w-9 h-9 mt-1 bg-cover"
            style={{ backgroundImage: `url(${img.src})` }}
          ></div>
          <div className="relative">
            <h2>{user.name}</h2>
            <span className="text-sm absolute top-6 left-1">
              Edad: {user.age}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-sm gap-1">
          <div className="flex">
            <MdChecklist size="17px" color="#62CFE4" />
            <span>interes : {user.interests.map((e) => `${e}, `)}</span>
          </div>
          <div className="flex">
            <MdLocationPin size="17px" color="#62CFE4" />
            <span>Distrito y ciudad: {user.city}</span>
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
