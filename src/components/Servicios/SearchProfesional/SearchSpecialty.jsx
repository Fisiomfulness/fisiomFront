"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "../store/servicios";
import { AiFillHome } from "react-icons/ai";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { apiEndpoints } from "@/api_endpoints";
import axios from "axios";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function SearchSpecialty() {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [specialties, setSpecialties] = useState([]);

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

  const onSelectionChange = (value) => {
    setFilters((filters) => ({ ...filters, specialtyId: value, page: 1 }));
  };

  return (
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
            <FaBriefcaseMedical alt={item.name} className="text-primary-300" />
            <span>{item.name}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
