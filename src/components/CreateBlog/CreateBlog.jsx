"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Rating from "@/components/CreateBlog/Rating";
import ImageBlog from "@/components/CreateBlog/ImageBlog";
import ScrollBlog from "./ScrollBlog";

const CreateBlog = () => {
  return (
    <div className="flex mx-2 md:mx-0">
      <div className="flex flex-col ml-0 md:ml-5">
        <h1>Titulo</h1>
        <h5 className="w-full mb-7">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
          vero, odit obcaecati vitae, illum explicabo soluta officia quod ab
          tempore repellat, pariatur id doloribus. Minus aspernatur incidunt
          molestiae iusto? Neque? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Vel, quidem sunt ab eaque, incidunt similique quo
          tempore nisi velit harum ipsum accusamus odit omnis fugit reiciendis,
          totam voluptatibus asperiores doloremque?
        </h5>
        <div className="w-full visible mb-7 md:w-[380px] md:hidden">
          <ImageBlog dataImage="https://images.ecestaticos.com/QbL6ro7ikJbVV9a66qyu4q_AjFY=/0x70:1716x1040/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F8db%2F8b6%2Faa5%2F8db8b6aa54b585253e15f79a68447aeb.jpg" />
        </div>
        <ScrollBlog />
        <div className="bg-[#D8EEF8] flex flex-wrap items-center justify-between p-4 md:p-0 mt-7">
          <h4 className="flex-grow mb-2 sm:mb-0 mr-4 ml-2 md:ml-5 sm:mr-0">
            Valoración
          </h4>
          <div className="flex-grow flex items-center mb-2 sm:mb-0 mr-4 sm:mr-0">
            <Rating />
          </div>
          <input
            className="flex-grow rounded-none mb-2 sm:mb-0 p-2 sm:w-auto sm:mr-0 bg-zinc-200"
            type="text"
            placeholder="agregar un comentario..."
          />
          <Button
            color="primary"
            className="flex-none rounded-none w-full md:w-36 sm:w-auto"
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
