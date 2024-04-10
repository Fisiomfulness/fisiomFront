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
    fetch(apiEndpoints.categories, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setCategories([...data.categories.sort((a, b) => a.name.localeCompare(b.name))]);
      });
  }, []);

  useEffect(() => {
    setProdFiltrados(
      prods.filter(
        (prod) =>
          (filter.category === 'All' || prod.category._id === filter.category) &&
          prod.name.toLowerCase().includes(filter.name.toLowerCase())
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
          {
            categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
};
