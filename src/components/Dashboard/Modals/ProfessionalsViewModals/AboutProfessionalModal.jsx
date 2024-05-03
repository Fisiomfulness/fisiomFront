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
} from '@nextui-org/react';
import { FaInfoCircle } from 'react-icons/fa';

export default function AboutProfessionalModal({ professional }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-primary-500 font-semibold text-white"
        startContent={<FaInfoCircle className="text-2xl" />}
      >
        Acerca de...
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-[40rem] bg-zinc-100 overflow-auto max-h-[30rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                <p> Acerca de: {professional.name}</p>
                <Divider className="w-[80%]" />
              </ModalHeader>
              <ModalBody>
                <p>{professional.resume}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
