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
  Divider,
  Spinner,
} from '@nextui-org/react';
import { CiTrash } from 'react-icons/ci';
import { deleteProductById } from '@/app/api/productsActions/deleteProduct';
import toast from 'react-hot-toast';

export default function DeleteProductModal({ product, setFetchAgain }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteProduct = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    const { data, error } = await deleteProductById(product._id, token);
    if (error) {
      setIsLoading(false);
      return toast.error(error);
    }
    setIsLoading(false);
    //Acá cambio el estado de fetchAgain para volver a ejecutar el useEffect de ProductsView.
    setFetchAgain((fetchAgain) => !fetchAgain);
    return toast.success('Producto borrado con éxito.');
  };
  return (
    <>
      <button
        className="flex items-center justify-start rounded-full "
        onClick={onOpen}
      >
        <CiTrash className=" text-2xl" />
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
              <ModalHeader className="flex flex-col gap-1 w-full">
                {!isLoading ? (
                  <p className="text-center flex gap-1 items-center justify-center">
                    <span>
                      ¿Quieres {''}
                      <span className="font-bold underline text-red-600">
                        eliminar
                      </span>
                      {''} el producto:{' '}
                      <span className="text-default-500">{product.name}</span>?
                    </span>
                  </p>
                ) : (
                  <p className="text-center">
                    Aguarda un <span className="text-primary-600">momento</span>{' '}
                    por favor...
                  </p>
                )}
                <Divider />
              </ModalHeader>

              <ModalBody>
                {!isLoading ? (
                  <p>
                    Ten en cuenta que esta acción{' '}
                    <span className="font-semibold text-red-600">NO</span> puede
                    deshacerse.
                  </p>
                ) : (
                  <div className="flex items-center justify-center pb-4">
                    <Spinner color="primary" />
                  </div>
                )}
              </ModalBody>
              {!isLoading && (
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    endContent={<CiTrash className="text-2xl" />}
                    color="success"
                    onPress={async () => {
                      await deleteProduct();
                      onClose();
                    }}
                  >
                    Borrar producto
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
