import { Tabs, Tab } from '@nextui-org/tabs';
import { Button, Input, button } from '@nextui-org/react';
import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { questionsAtom, filtersAtom } from './store/questions';
import { FaSearch } from 'react-icons/fa';

const QuestionFilters = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useAtom(filtersAtom);
  const { specialties } = useAtomValue(questionsAtom);

  const handleChange = (name, value) => {
    if (name === 'search') {
      setSearch(value);
      // * If cleans the input gets all the results
      if (value === '' && filters.search !== '') {
        setFilters({ ...filters, search: '' });
      }
    } else {
      setSearch('');
      setFilters({ search: '', specialtyId: value });
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // * Can't send the previous search
    if (filters.search !== search.trim()) {
      setFilters({ ...filters, search });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-4 mb-2 border border-primary-100 bg-primary-100/20 shadow-sm p-4 rounded-md">
      <form onSubmit={handleSearch} className="flex">
        <Input
          type="text"
          variant="flat"
          aria-label="búsqueda de pregunta"
          placeholder="Busca una pregunta..."
          size="md"
          radius="sm"
          value={search}
          onValueChange={(value) => handleChange('search', value)}
          classNames={{
            input:
              'text-secondary-400 placeholder:text-secondary-400/80 placeholder:italic',
            inputWrapper:
              'pr-0 overflow-hidden border-2 border-secondary-50 hover:focus:!border-primary-300 !bg-white mx-1',
          }}
          endContent={
            <Button
              type="submit"
              radius="none"
              className="bg-primary-100 !outline-none"
            >
              <FaSearch className="size-4 text-secondary-300" />
            </Button>
          }
        />
      </form>
      <Tabs
        variant="light"
        aria-label="especialidades"
        defaultSelectedKey={'1'}
        selectedKey={filters.specialtyId}
        onSelectionChange={(value) => {
          // * Don't filter if the specialty is already selected
          if (filters.specialtyId !== value) handleChange('specialtyId', value);
        }}
        disableCursorAnimation={true}
        classNames={{
          tabList: 'gap-3 flex-wrap rounded-none',
          tab: 'border border-primary-100 bg-white w-fit shadow-sm [&[data-hover-unselected="true"]]:opacity-hover [&[aria-selected="true"]]:!border-primary-300 [&[aria-selected="true"]]:!shadow-inner [&[aria-selected="true"]]:bg-gradient-to-br from-primary-300 to-primary-600',
          tabContent:
            'text-primary-700 group-data-[selected=true]:text-white group-data-[selected=true]:font-semibold',
        }}
      >
        {[{ id: '1', name: 'General' }, ...specialties].map((specialty) => (
          <Tab
            aria-label={specialty.name}
            key={specialty.id}
            title={specialty.name}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionFilters;
