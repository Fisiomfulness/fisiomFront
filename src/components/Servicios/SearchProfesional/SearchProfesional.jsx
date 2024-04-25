"use-client";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { MdOutlineSearch } from "react-icons/md";
import { apiEndpoints } from "@/api_endpoints";

const SearchProfesional = ({ filters, setFilters, setPage }) => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.specialties, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setSpecialties(data);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      })
    return () => abortController.abort();
  }, []);
  const onChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setPage(1);
  };

  const onSelectionChange = (value) => {
    setFilters({ ...filters, specialtyId: value });
    setPage(1);
  };

  return (
    <div className="flex m-4 gap-5">
      <Input
        label="Busqueda"
        isClearable
        radius="lg"
        onChange={onChange}
        value={filters.search}
        onClear={() => setFilters({ ...filters, search: "" })}
        placeholder="Busqueda del profesional..."
        startContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
      />
      <Autocomplete
        startsWidth={<AiFillHome />}
        label="Seleccione:"
        placeholder="Especialidad"
        className="max-w-xs md:mr-2 mr-0"
        defaultItems={specialties}
        listboxProps={{
          color: "primary",
        }}
        allowsCustomValue={true}
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
