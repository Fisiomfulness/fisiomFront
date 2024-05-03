import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { MdDelete } from 'react-icons/md';
import { IoMdReturnLeft } from 'react-icons/io';
import { deleteComment } from '@/app/api/commentsActions/deleteComment';

export default function DeleteCommentModal({ comment }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteCommentById = async (commentId) => {
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const { data, error } = await deleteComment(commentId, token);
    if (error) {
      setIsLoading(false);
      return toast.error(error);
    }
    setIsLoading(false);
    return toast.success(data.message);
  };

  return (
    <>
      <button
        className="absolute bottom-0 right-0 hover:animate-pulse text-red-600"
        onClick={onOpen}
      >
        <MdDelete className="text-2xl" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                ¿Quieres eliminar este comentario?
              </ModalHeader>
              <ModalBody>
                {!isLoading ? (
                  <p className="">
                    Ni el profesional ni el autor del comentario serán
                    notificados de esta operación.{' '}
                    <span className="text-red-600">
                      Ten en cuenta que esta acción no puede deshacerse.
                    </span>
                  </p>
                ) : (
                  <div className="flex items-center justify-center pb-4">
                    <Spinner color="primary" />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  endContent={<IoMdReturnLeft className="text-2xl" />}
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  endContent={<MdDelete className="text-2xl" />}
                  onPress={() => {
                    //!Por ahora queda así hasta que los profesionales tengan comentarios.
                    alert(comment._id);
                    // deleteCommentById(comment._id);
                    onClose();
                  }}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
