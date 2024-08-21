import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../SearchIcon.jsx';
import { Select, SelectItem } from '@nextui-org/react';
import { getBlogs } from '@/services/blogs.js';
import Publication from './Publication.jsx';

const selectItems = [
  { label: 'Todos', value: 'default' },
  { label: 'Valoración (mayor a menor)', value: 'highest' },
  { label: 'Valoración (menor a mayor)', value: 'lowest' },
];

export default function BlogAside({
  cardsPerPage,
  lastsBlogs,
  setBlogs,
  setPage,
  setTotalPages,
  setQuery,
}) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const filterQuery = {
      page: 1,
      limit: cardsPerPage,
      search: debouncedSearch,
      sortBy: sortOrder !== 'default' ? 'avg_rating' : 'title',
      order: sortOrder === 'highest' ? 'desc' : 'asc',
      status: true,
    };
    setQuery(filterQuery);
    getBlogs(filterQuery).then((res) => {
      setPage(res.page);
      setTotalPages(res.totalPages);
      setBlogs(res.blogs);
    });
  }, [debouncedSearch, sortOrder]);

  return (
    <aside className="w-full overflow-hidden grid grid-cols-1 grid-rows-[max-content,max-content,auto] py-12 bg-[#D8EEF8] px-4 sm:px-6 ml-0 xl:max-h-[1200px]">
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
        selectedKeys={[sortOrder]}
        onChange={(e) => {
          const { value } = e.target;
          setSortOrder(value == '' ? 'default' : value);
        }}
      >
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>

      <div className="flex flex-col mt-10 gap-4 overflow-hidden">
        <h4>Últimas publicaciones</h4>
        <div className="flex flex-col gap-5 overflow-y-auto overflow-x-hidden xl:h-max xl:max-h-[40rem] sm:items-start p-0">
          {lastsBlogs?.length > 0 ? (
            <>
              {lastsBlogs.map((blog) => (
                <Publication key={blog._id} data={blog} />
              ))}
            </>
          ) : (
            <h1 className="text-sm text-secondary-400 justify-self-center">
              No hay publicaciones
            </h1>
          )}
        </div>
      </div>
    </aside>
  );
}
