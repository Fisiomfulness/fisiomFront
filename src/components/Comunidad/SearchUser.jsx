"use client";
import useFilteredUsers from "./useFilteredUsers";
import { Select, SelectItem } from "@nextui-org/react";
import { CustomInput } from "@/features/ui";
import { MdOutlineSearch } from "react-icons/md";

const SearchUsers = ({ users, setUsersFiltered }) => {
  const interestSet = new Set(users.flatMap((user) => user.interests));
  const interestArr = Array.from(interestSet).concat("Todos");

  const { selectedInterest, setSelectedInterest, filter, handleOnChange } =
    useFilteredUsers(users, setUsersFiltered);

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-5">
      <div className="relative flex items-center text-sm">
        <CustomInput
          id="name"
          value={filter.name}
          onChange={(e) => handleOnChange(e)}
          size="lg"
          placeholder="Buscar persona..."
          endContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
        />
      </div>
      <div className="flex w-full ">
        <Select
          label="Intereses:"
          variant="bordered"
          placeholder="Selecciona un interes"
          selectedKeys={new Set([selectedInterest])}
          className="max-w-xs"
          onSelectionChange={(keys) => {
            const selectedKey = keys.values().next().value;
            setSelectedInterest(selectedKey);
          }}
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
