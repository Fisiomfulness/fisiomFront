"use-client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../store/servicios";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { MdOutlineSearch } from "react-icons/md";
import { apiEndpoints } from "@/api_endpoints";

const SearchProfesional = ({ setPage }) => {
  const [specialties, setSpecialties] = useState([]);
  const [filters, setFilters] = useAtom(filtersAtom);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.specialties, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setSpecialties(data.results);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, []);
  const onChange = (e) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
    setPage(1);
  };

  const onSelectionChange = (value) => {
    setFilters((filters) => ({ ...filters, specialtyId: value }));
    setPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 bg-primary-500 p-5 rounded-md">
      <Input
        label="Busqueda"
        isClearable
        radius="lg"
        onChange={onChange}
        value={filters.search}
        onClear={() => setFilters((filters) => ({ ...filters, search: "" }))}
        placeholder="Busqueda del profesional..."
        startContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
      />
      <Autocomplete
        startsWidth={<AiFillHome />}
        label="Seleccione:"
        placeholder="Especialidad"
        className="w-full sm:max-w-sm"
        defaultItems={specialties}
        listboxProps={{
          color: "primary",
        }}
        allowsCustomValue={true}
        selectedKey={filters.specialtyId}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <AutocompleteItem key={item._id} textValue={item.name}>
            <div className="flex items-center gap-2">
              <FaUserDoctor alt={item.name} className="text-primary-300" />
              <span>{item.name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchProfesional;
