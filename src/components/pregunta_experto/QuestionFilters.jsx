import { Tabs, Tab } from '@nextui-org/tabs';
import { Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { questionsAtom, filtersAtom } from './store/questions';

const QuestionFilters = () => {
  const [searchWithoutDebounce, setSearchWithoutDebounce] = useState('');
  const [filters, setFilters] = useAtom(filtersAtom);
  const { specialties, questions } = useAtomValue(questionsAtom);
  const debounce = useRef(null);

  const debounceSearch = (value) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 500);
  };

  const handleChange = (name, value) => {
    if (name === 'search') {
      setSearchWithoutDebounce(value);
      debounceSearch(value);
    } else {
      setSearchWithoutDebounce('');
      setFilters({ search: '', specialtyId: value });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-4 mb-2 border border-primary-100 bg-primary-100/20 shadow-sm p-4 rounded-md">
      <Input
        type="search"
        aria-label="búsqueda de pregunta"
        placeholder="Busca una pregunta..."
        size="md"
        radius="sm"
        value={searchWithoutDebounce}
        onValueChange={(value) => handleChange('search', value)}
        variant="flat"
        classNames={{
          input:
            'text-secondary-400 placeholder:text-secondary-400/80 placeholder:italic',
          inputWrapper:
            'border-2 border-secondary-50 hover:focus:!border-primary-300 !bg-white mx-1',
        }}
      />
      <Tabs
        variant="light"
        aria-label="especialidades"
        defaultSelectedKey={'1'}
        selectedKey={filters.specialtyId}
        onSelectionChange={(value) => {
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
