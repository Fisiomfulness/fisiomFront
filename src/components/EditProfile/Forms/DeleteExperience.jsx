import { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { deleteExperience } from '@/services/professionals';
import toast from 'react-hot-toast';

const DeleteExperience = ({
  isOpen,
  onClose,
  professionalId,
  experienceId,
  setProfessional,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { experiences } = await deleteExperience(professionalId, experienceId);
      setProfessional((prev) => ({...prev, experience: experiences }));
      toast.success('Experiencia eliminada correctamente');
    } catch (error) {
      toast.error('Oops algo salio mal... vuelva a intentarlo');
    } finally {
      onClose();
      setIsDeleting(false);
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Confirmación</h2>
        </ModalHeader>
        <ModalBody>
          <p>¿Esta seguro/a de que desea eliminar esta experiencia?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose} isDisabled={isDeleting}>
            Cancelar
          </Button>
          <Button color="danger" onPress={handleDelete} isDisabled={isDeleting}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExperience;
