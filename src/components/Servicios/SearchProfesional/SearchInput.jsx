"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../store/servicios";
import { Input } from "@nextui-org/react";
import { MdOutlineSearch } from "react-icons/md";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [filters, setFilters] = useAtom(filtersAtom);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && value !== "") {
      setFilters((filters) => ({
        ...filters,
        search: [...filters.search, value],
        page: 1,
      }));
      setValue("");
    }
  };
  return (
    <Input
      label="Busqueda"
      isClearable
      radius="lg"
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
      onClear={() => setValue("")}
      placeholder="Busqueda del profesional..."
      startContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
    />
  );
}
