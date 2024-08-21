'use client';
import axios from 'axios';
import { MdOutlineSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../SearchIcon';
import { apiEndpoints } from '@/api_endpoints';

export const SearchProd = ({ filter, setFilter, setPage }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    axios
      .get(apiEndpoints.categories, {
        signal: abortController.signal,
      })
      .then(({ data }) => {
        setCategories(
          data.categories.toSorted((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch((err) => {
        if (err.name === 'CanceledError') return;
        throw err;
      });

    return () => abortController.abort();
  }, []);

  const handleOnChange = (e) => {
    setPage(1);
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
        size="lg"
        startContent={<SearchIcon size={18} />}
        type="search"
      />
      <select
        value={filter.categoryId}
        id="categoryId"
        className="w-[200px] p-3 rounded-sm cursor-pointer outline-none"
        style={{ boxShadow: '0px 2px 2px 0px #00000040' }}
        onChange={(e) => handleOnChange(e)}
      >
        <option value="" className="">
          Todas
        </option>
        {categories?.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
