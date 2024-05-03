'use client';
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
  Divider,
} from '@nextui-org/react';
import { CiEdit, CiSaveDown1 } from 'react-icons/ci';
import Image from 'next/image';

export default function EditProductModal({ product }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [editedProduct, setEditedProduct] = React.useState({});
  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'image') {
      const file = event.target.files?.[0];
      const path = URL.createObjectURL(file);
      setSelectedImage(path);
    } else {
      setEditedProduct({
        ...editedProduct,
        [name]: value,
      });
    }
  }

  return (
    <>
      <button
        className="flex items-center justify-start rounded-full "
        onClick={onOpen}
      >
        <CiEdit className=" text-2xl" />
      </button>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-primary-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ">
                <h3 className="flex gap-2">
                  {' '}
                  Editar el producto:{' '}
                  <p className="text-default-400">{product.name}</p>
                </h3>
                <Divider />
              </ModalHeader>

              <ModalBody>
                <div className="w-full gap-2 items-center grid grid-cols-2">
                  <div className="flex flex-col h-full justify-between ">
                    <Input
                      autoFocus
                      name="name"
                      label="Nombre"
                      onChange={handleChange}
                      variant="bordered"
                      placeholder={product.name}
                    />
                    <Input
                      label="Precio"
                      name="price"
                      placeholder={product.price}
                      onChange={handleChange}
                      variant="bordered"
                      type="number"
                    />
                    <Input
                      label="Stock"
                      name="stock"
                      placeholder={product.stock}
                      onChange={handleChange}
                      type="number"
                      variant="bordered"
                    />
                  </div>
                  <Image
                    src={selectedImage ? selectedImage : product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover max-h-[200px]"
                  />
                </div>
                <div className="w-full py-2 border-2 border-default-200 rounded-xl px-3 hover:border-default-400 transition-all">
                  <p className="text-default-900 text-[.8rem]">
                    Actualizar imágen del producto
                  </p>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className=""
                  />
                </div>
                <textarea
                  name="description"
                  rows="5"
                  onChange={handleChange}
                  defaultValue={product.description}
                  className="w-full px-3 py-2 border-2 border-default-200 rounded-xl  hover:border-default-400 transition-all bg-primary-50"
                  placeholder="Descripción del producto"
                ></textarea>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose();
                    setSelectedImage(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  endContent={<CiSaveDown1 className="text-2xl" />}
                  color="success"
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
