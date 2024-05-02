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
  Divider,
} from '@nextui-org/react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { CiCircleInfo } from 'react-icons/ci';
import { productColumns, statusOptions } from '../data/data';
import { capitalize } from '../data/data';
import { CiSearch } from 'react-icons/ci';
import { FaChevronCircleDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getAllProducts } from '@/app/api/productsActions/getAllProducts';
import { FaPlus } from 'react-icons/fa6';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import EditProductModal from '../Modals/EditProductModal';
import DeleteProductModal from '../Modals/DeleteProductModal';

//Este array es para cambiar el color del punto de stock del producto, si hay más de 10, es verde, si hay menos de 10 es amarillo y si no hay es rojo.
const stockColorMap = {
  10: 'success',
  0: 'danger',
  9: 'warning',
};

//Columnas que comienzan visibles apenas se renderiza la tabla.
const INITIAL_VISIBLE_COLUMNS = [
  'name',
  'price',
  'stock',
  'category',
  'actions',
];

export default function ProductsView() {
  //! ------------- ESTADOS DE VENTANA MODAL ----------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productInfo, setProductInfo] = React.useState({});
  //! ------------- ESTADOS DE LA TABLA ----------------

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [products, setProducts] = React.useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'name',
    direction: 'ascending',
  });
  React.useEffect(() => {
    getProducts();
  }, []);
  //! ---------- FUNCTIONS ----------
  const getProducts = async () => {
    const { data, error } = await getAllProducts();
    if (error) {
      return toast.error(error);
    }
    return setProducts(data.products);
  };
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(products?.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return productColumns;

    return productColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

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

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'full', size: 'sm', src: product.image }}
            classNames={{
              description: 'text-default-500 ',
            }}
            name={<p className="capitalize">{cellValue}</p>}
          >
            {product.category.name}
          </User>
        );
      case 'price':
        return (
          <div className="flex flex-col justify-start">
            <p className="text-bold text-small capitalize">$ {product.price}</p>
          </div>
        );
      case 'stock':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={
              stockColorMap[
                product.stock > 10 ? 10 : product.stock == 0 ? 0 : 9
              ]
            }
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case 'category':
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color="primary"
            size="sm"
            variant="dot"
          >
            {product?.category?.name}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex justify-start items-center gap-2">
            <EditProductModal product={product} />
            <button
              onClick={() => {
                setProductInfo(product);
                onOpen();
              }}
              className="flex items-center justify-start rounded-full "
            >
              <CiCircleInfo className=" text-2xl" />
            </button>
            <button
              onClick={() => {
                setProductInfo(product);
              }}
              className="flex items-center justify-start rounded-full "
            >
              <DeleteProductModal product={product} />
            </button>
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
            className="bg-zinc-200 w-full sm:max-w-[44%] border border-black rounded-lg"
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
                {productColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="flex gap-3 bg-zinc-300" size="sm">
              <FaPlus className="text-small" />
              Agregar producto
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Productos creados: {products.length}.
          </span>
          <label className="flex items-center  text-black  text-small">
            Productos por página:
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
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
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
      className="w-full h-full flex flex-col gap-3 items-center justify-center "
    >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-primary-50">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                {productInfo.name}
                <Divider />
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <Image
                    src={productInfo.image}
                    alt={productInfo.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <section className="flex flex-col gap-3 w-full">
                  <p className="text-default-500">{productInfo.description}</p>
                  <p className="flex gap-2 ">
                    Categoría:{' '}
                    <p className="text-default-500 capitalize">
                      {productInfo.category.name}
                    </p>
                  </p>
                  <p className="flex gap-2 ">
                    Precio:{' '}
                    <p className="text-default-500">$ {productInfo.price}</p>
                  </p>
                  <p className="flex gap-2 ">
                    {' '}
                    Stock actual:{' '}
                    <p className="text-default-500">{productInfo.stock}</p>
                  </p>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        selectionBehavior="toggle"
        bottomContentPlacement="outside"
        classNames={classNames}
        className="border border-black rounded-lg p-5 w-[85%] overflow-x-auto max-w-[60rem]"
        selectedKeys={selectedKeys}
        selectionMode="none"
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
          emptyContent={'No se encontraron productos.'}
          items={sortedItems}
          className="w-full "
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
