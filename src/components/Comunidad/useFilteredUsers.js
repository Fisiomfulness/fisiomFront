import { useState, useEffect } from "react";

const useFilteredUsers = (users, setUsersFiltered) => {
  const [selectedInterest, setSelectedInterest] = useState("Todos");
  const [filter, setFilter] = useState({
    name: "",
    interes: "Todos",
  });

  useEffect(() => {
    setFilter((prev) => ({ ...prev, interes: selectedInterest }));
  }, [selectedInterest]);

  const handleOnChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (filter.interes === "Todos") {
      setUsersFiltered(
        users.filter((e) =>
          e.name.toLowerCase().includes(filter.name.toLowerCase())
        )
      );
    } else {
      setUsersFiltered(
        users.filter(
          (e) =>
            e.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            e.interests.includes(filter.interes)
        )
      );
    }
  }, [filter, setUsersFiltered, users]);

  return {
    selectedInterest,
    setSelectedInterest,
    filter,
    handleOnChange,
  };
};

export default useFilteredUsers;
