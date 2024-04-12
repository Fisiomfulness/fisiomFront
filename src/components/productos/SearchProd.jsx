"use client";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon";
import { apiEndpoints } from "@/api_endpoints";

export const SearchProd = ({ prods, setProdFiltrados }) => {
  const [filter, setFilter] = useState({
    category: "All",
    name: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(apiEndpoints.categories, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(
          data.categories.toSorted((a, b) => a.name.localeCompare(b.name)),
        );
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        throw err;
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    setProdFiltrados(
      prods.filter((prod) => {
        const isValidCategory =
          filter.category === "All" || prod.category._id === filter.category;
        const nameMatches = prod.name
          .toLowerCase()
          .includes(filter.name.toLowerCase());
        return isValidCategory && nameMatches;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleOnChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  return (
    <div className="center sm:flex-row w-full gap-5 my-4">
      <Input
        id="name"
        value={filter.name}
        className="border-none outline-none w-[250px]"
        onChange={(e) => handleOnChange(e)}
        placeholder="Buscar artículo..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
      />
      <div className="flex text-sm">
        <select
          value={filter.category}
          id="category"
          className="w-[200px] p-3 rounded-sm cursor-pointer outline-none"
          style={{ boxShadow: "0px 2px 2px 0px #00000040" }}
          onChange={(e) => handleOnChange(e)}
          placeholder={filter.category}
        >
          <option value="All" className="">
            Todas
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
