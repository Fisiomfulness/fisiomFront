"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { CustomInput } from "@/features/ui";
import { MdOutlineSearch } from "react-icons/md";

// TODO: Replace when interests exist on database
const interestArr = [
  "running",
  "futbol",
  "yoga",
  "tenis",
  "musculación",
  "nutrición",
];

const SearchUsers = ({ filters, setFilters, setPage }) => {
  const onChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setPage(1);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-5">
      <div className="relative flex items-center text-sm">
        <CustomInput
          id="search"
          value={filters.search}
          onChange={onChange}
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
          selectedKeys={filters.interests}
          className="max-w-xs"
          onChange={(e) =>
            setFilters({
              ...filters,
              interests: new Set(e.target.value.split(",")),
            })
          }
        >
          {interestArr.map((interest) => (
            <SelectItem key={interest} value={interest}>
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SearchUsers;
