import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { FaDollarSign, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { BiUpload } from 'react-icons/bi';
import { MdDriveFileRenameOutline, MdOutlineDescription } from 'react-icons/md';
import { createNewProduct } from '@/app/api/productsActions/createNewProduct';
import toast from 'react-hot-toast';

export default function CreateProductModal({ categories, setFetchAgain }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({});
  const [selectedImage, setSelectedImage] = React.useState(null);
  const defaultImage =
    'https://res.cloudinary.com/db7wpgkge/image/upload/v1714696613/utsecidjcstdszkhjhlx.png';
  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'image') {
      const file = event.target.files?.[0];
      const path = URL.createObjectURL(file);
      setSelectedImage(path);
      setNewProduct({
        ...newProduct,
        [name]: file,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  }

  async function handleSubmit() {
    const form = document.getElementById('createProductForm');
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);

    const { data, error } = await createNewProduct(formData);
    if (error) {
      setIsLoading(false);
      return toast.error(error);
    }
    form.reset();
    setSelectedImage(null);

    setIsLoading(false);
    //Acá cambio el estado de fetchAgain para volver a ejecutar el useEffect de ProductsView.
    setFetchAgain((fetchAgain) => !fetchAgain);
    return toast.success(data.message);
  }
  return (
    <>
      <Button className="flex gap-3 bg-zinc-300" size="sm" onClick={onOpen}>
        <FaPlus className="text-small" />
        Crear producto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                {isLoading ? (
                  <h3 className="text-center text-medium flex gap-2 items-center justify-center">
                    Por favor espere...
                    <div className="border-b-2 rounded-full  border-primary-500 animate-spin w-8 h-8"></div>
                  </h3>
                ) : (
                  <h3 className="text-center text-medium">
                    Aquí puedes agregar un nuevo producto a la plataforma.
                  </h3>
                )}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
                {!isLoading && (
                  <form
                    id="createProductForm"
                    className="flex gap-2 justify-between w-full"
                  >
                    <div className="flex flex-col gap-1 w-[60%]">
                      <Input
                        startContent={<MdDriveFileRenameOutline />}
                        autoFocus
                        aria-label="nombre del producto"
                        size="sm"
                        name="name"
                        isRequired
                        placeholder="Nombre del producto"
                        onChange={handleChange}
                        className="text-default-600"
                        variant="bordered"
                      />
                      <Input
                        startContent={<FaDollarSign />}
                        size="sm"
                        onChange={handleChange}
                        isRequired
                        aria-label="precio del producto"
                        name="price"
                        placeholder="Precio"
                        className="text-default-600"
                        type="number"
                        variant="bordered"
                      />
                      <Textarea
                        startContent={<MdOutlineDescription />}
                        onChange={handleChange}
                        size="sm"
                        name="description"
                        rows={3}
                        aria-label="Descripción del producto"
                        placeholder="Descripción"
                        className="text-default-600"
                        isRequired
                        type="textarea"
                        variant="bordered"
                      />
                    </div>
                    <div className="grid place-content-center  w-[40%] relative border rounded-full">
                      <Image
                        alt="Imágen del producto"
                        width={200}
                        height={200}
                        className="rounded-full w-[150px] h-[150px] object-cover"
                        src={selectedImage || defaultImage}
                      />
                      <div className="absolute w-8 h-8 grid place-content-center bg-primary-200 rounded-full bg-opacity-90  -bottom-2 left-[50%] translate-x-[-50%] group">
                        <input
                          onChange={handleChange}
                          name="image"
                          required
                          id="uploadImgInput"
                          type="file"
                          className="hidden cursor-pointer"
                        />
                        <label htmlFor="uploadImgInput">
                          <BiUpload className="text-2xl cursor-pointer group-hover:scale-110 transition-all" />
                        </label>
                      </div>
                    </div>
                  </form>
                )}
              </ModalBody>
              {!isLoading && (
                <ModalFooter className="flex justify-between w-full relative">
                  <div className="flex gap-2 w-[60%]">
                    <Select
                      className="w-[60%]"
                      aria-label="Categoría"
                      onChange={handleChange}
                      isRequired
                      placeholder="Categoría"
                      name="category"
                      variant="bordered"
                    >
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      className="w-[40%]"
                      variant="bordered"
                      aria-label="Stock"
                      isRequired
                      onChange={handleChange}
                      name="stock"
                      placeholder="Stock"
                      type="number"
                    />
                  </div>
                  <Button
                    color="success"
                    startContent={<FaPlus className="text-2xl" />}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    Crear producto
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
