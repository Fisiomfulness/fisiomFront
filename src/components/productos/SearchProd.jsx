"use client";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon";

export const SearchProd = ({ prods, setProdFiltrados }) => {
  const [filter, setFilter] = useState({
    categoria: "categoria",
    nombre: "",
  });

  useEffect(() => {
    setProdFiltrados(
      prods.filter(
        (e) =>
          e.categoria.toLowerCase().includes(filter.categoria.toLowerCase()) &&
          e.nombre.toLowerCase().includes(filter.nombre.toLowerCase())
      )
    );
  }, [filter, prods, setProdFiltrados]);

  const handleOnChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-5 mt-4 mb-4">
     <Input
        id="nombre"
        value={filter.nombre}
        className="border-none outline-none w-[250px]"
        onChange={(e) => handleOnChange(e)}
        placeholder="Buscar artículo..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
      />
      <div className="flex text-sm">
        <select
          value={filter.categoria}
          id="categoria"
          className="w-[200px] p-3 rounded-sm cursor-pointer outline-none"
          style={{ boxShadow: "0px 2px 2px 0px #00000040" }}
          onChange={(e) => handleOnChange(e)}
          placeholder={filter.categoria}
        >
          <option value="categoria" className="">
            Todas
          </option>
          <option value="categoria 1">Categoria 1</option>
          <option value="categoria 2">Categoria 2</option>
          <option value="categoria 3">Categoria 3</option>
        </select>
      </div>
    </div>
  );
};
