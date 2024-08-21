"use client";

import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filtersAtom } from "./store/comunidad";
import { Select, SelectItem } from "@nextui-org/react";
import { CustomInput } from "@/features/ui";
import { MdOutlineSearch } from "react-icons/md";

const SearchUsers = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.interests, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setInterests(data.interests);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, []);

  const onChangeInput = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const onChangeSelect = (e) => {
    setFilters((prev) => ({
      ...prev,
      interestsId: e.target.value.split(","),
      page: 1,
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-5">
      <div className="relative flex items-center text-sm">
        <CustomInput
          id="search"
          value={filters.search}
          onChange={onChangeInput}
          size="lg"
          placeholder="Buscar persona..."
          endContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
        />
      </div>
      <div className="flex w-full ">
        <Select
          label="Intereses:"
          variant="bordered"
          placeholder="Selecciona tus interes"
          selectionMode="multiple"
          selectedKeys={filters.interestsId}
          className="max-w-xs"
          onChange={onChangeSelect}
        >
          {interests.map((interest) => (
            <SelectItem key={interest._id} value={interest._id}>
              {interest.name.charAt(0).toUpperCase() + interest.name.slice(1)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SearchUsers;
