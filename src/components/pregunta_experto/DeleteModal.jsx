import { useSetAtom } from 'jotai';
import { deleteQuestion } from '@/services/questions';
import { deleteQuestionAtom } from './store/questions';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import toast from 'react-hot-toast';

export default function DeleteModal({ questionId, isOpen, onOpenChange }) {
  const filterQuestion = useSetAtom(deleteQuestionAtom);

  const handleDelete = async () => {
    try {
      await deleteQuestion(questionId);
      filterQuestion(questionId);
      toast.success('Pregunta eliminada correctamente');
    } catch (error) {
      toast.error('Oops.. hubo un error vuelva a intentar mas tarde');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmación
            </ModalHeader>
            <ModalBody>
              <p>Esta seguro de que desea eliminar esta pregunta?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDelete();
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
  );
}
