import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../SearchIcon.jsx';
import { Select, SelectItem } from '@nextui-org/react';
import Publication from './Publication.jsx';

export default function BlogAside({ lastsBlogs, setBlogs }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  return (
    <div className="flex flex-col py-12 bg-[#D8EEF8] px-4 sm:px-6 ml-0 xl:max-h-[1200px]">
      <Input
        classNames={{
          base: 'w-full h-10',
          mainWrapper: 'mb-4',
          input: 'text-xs sm:text-sm',
          inputWrapper:
            'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        placeholder="Filtrar por palabra clave"
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        aria-label="filtrado por valoración"
        placeholder="Filtrar"
        className="w-full mt-7"
        value={sortOrder}
        onChange={(value) => setSortOrder(value)}
      >
        <SelectItem value="default">Todos</SelectItem>
        <SelectItem value="highest">Valoración (mayor a menor)</SelectItem>
        <SelectItem value="lowest">Valoración (menor a mayor)</SelectItem>
      </Select>

      <h4 className="mt-10 mb-4">
        Últimas publicaciones
      </h4>
      <div className="flex flex-col gap-5 overflow-y-auto xl:h-max xl:max-h-[40rem] sm:items-start p-0">
        {lastsBlogs?.length > 0 ? (
          <>
            {lastsBlogs.map((blog) => (
              <Publication key={blog._id} data={blog} />
            ))}
          </>
        ) : (
          <h1 className="text-sm text-secondary-400 justify-self-center">No hay publicaciones</h1>
        )}
      </div>
    </div>
  );
}
