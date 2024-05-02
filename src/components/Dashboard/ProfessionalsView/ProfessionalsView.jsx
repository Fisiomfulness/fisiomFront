'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react';
import { CiEdit } from 'react-icons/ci';
import { CiCircleInfo } from 'react-icons/ci';
import { professionalColumns, statusOptions } from '../data/data';
import { capitalize } from '../data/data';
import { CiSearch } from 'react-icons/ci';
import { FaChevronCircleDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getAllProfessionals } from '@/app/api/professionalsActions/getAllProfessionals';
import ProfessionalInfoModal from '../Modals/ProfessionalInfoModal';
//Este array es para cambiar el color del Estado del usuario.
const statusColorMap = {
  true: 'success',
  false: 'danger',
};

//Columnas que comienzan visibles apenas se renderiza la tabla.
const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'birthDate',
  'confirmEmail',
  'phone',
  'actions',
];

export default function ProfessionalsView() {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [professionals, setProfessionals] = React.useState([]);

  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'name',
    direction: 'ascending',
  });
  React.useEffect(() => {
    getProfessionals();
  }, []);
  const getProfessionalAge = (birthDate) => {
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return age;
  };
  //! ---------- FUNCTIONS ----------
  const getProfessionals = async () => {
    const { data, error } = await getAllProfessionals();
    if (error) {
      return toast.error(error);
    }
    return setProfessionals(data.professionals);
  };
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(professionals?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return professionalColumns;

    return professionalColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProfessionals = [...professionals];

    if (hasSearchFilter) {
      filteredProfessionals = filteredProfessionals?.filter((professional) =>
        professional.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProfessionals;
  }, [professionals, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((professional, columnKey) => {
    const cellValue = professional[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{
              radius: 'full',
              size: 'sm',
              src: professional.image,
            }}
            classNames={{
              description: 'text-default-500 ',
            }}
            description={professional.email}
            name={<p className="capitalize">{cellValue}</p>}
          >
            {professional.email}
          </User>
        );
      case 'birthDate':
        return (
          <div className="flex flex-col justify-start">
            <p className="text-bold text-small capitalize">
              {getProfessionalAge(cellValue)}
            </p>
          </div>
        );
      case 'confirmEmail':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[professional.confirmEmail]}
            size="sm"
            variant="dot"
          >
            {professional.confirmEmail ? 'Confirmado' : 'Pendiente'}
          </Chip>
        );
      case 'phone':
        return (
          <div className="flex flex-col justify-start">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'license':
        return (
          <div className="flex flex-col justify-start">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'gender':
        return (
          <div className="flex flex-col justify-start">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-start items-center gap-2">
            <ProfessionalInfoModal professional={professional} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: ' ',
              inputWrapper: 'border-1',
            }}
            className=" w-full sm:max-w-[44%] border border-black rounded-lg "
            placeholder="Filtrar por nombre"
            size="sm"
            startContent={<CiSearch className=" text-black" />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaChevronCircleDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {professionalColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Profesionales registrados: {professionals.length}.
          </span>
          <label className="flex items-center  text-black  text-small">
            Profesionales por página:
            <select
              className="bg-transparent rounded-sm text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    professionals.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos seleccionados'
            : `${selectedKeys.size} de ${items.length} seleccionados.`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );
  return (
    <motion.section
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col gap-3 items-center justify-center"
    >
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              'after:bg-foreground after:text-background text-background',
          },
        }}
        classNames={classNames}
        className="border border-black rounded-lg p-5 w-[85%] overflow-x-auto max-w-[60rem]"
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className=""
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No se encontraron usuarios'}
          items={sortedItems}
          className="w-full"
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.section>
  );
}
