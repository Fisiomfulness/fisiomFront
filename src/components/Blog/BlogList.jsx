"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon.jsx";
import { Select, SelectItem } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Publication from "./Publication.jsx";

export default function BlogList({ blogData }) {
  return (
    <div className="flex flex-col py-12 bg-[#D8EEF8] px-4 sm:px-6 ml-0">
      <Input
        classNames={{
          base: "w-full h-10",
          mainWrapper: "mb-4",
          input: "text-xs sm:text-sm",
          inputWrapper:
            "font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Filtrar por palabra clave"
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
      />

      <Select placeholder="Filtrar" className="w-full mt-7">
        <SelectItem value="default">Todos</SelectItem>
        <SelectItem value="mayor_menor">Valoración (mayor a menor)</SelectItem>
        <SelectItem value="menor_mayor">Valoración (menor a mayor)</SelectItem>
      </Select>

      <h4 className="mt-10 mb-4 text-center sm:text-left">
        Últimas publicaciones
      </h4>
      {blogData.length > 0 ? (
        <div className="flex flex-col items-center sm:items-start gap-y-4">
          {blogData.map((blog) => (
            <Publication key={blog.id} data={blog}></Publication>
          ))}
        </div>
      ) : (
        <h1 className="text-sm">No hay publicaciones</h1>
      )}
    </div>
  );
}
