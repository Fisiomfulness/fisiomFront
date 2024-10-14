import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { deleteService } from '@/services/professionals';
import { useSetAtom } from 'jotai';
import { deleteServiceAtom } from '../store/my_services';
import toast from 'react-hot-toast';

const DeleteServiceModal = ({ service, isOpen, onDelete, onClose }) => {
  const deleteServiceUI = useSetAtom(deleteServiceAtom);

  if (!isOpen || !service) return null;

  const handleDelete = async () => {
    try {
      await deleteService(service._id);
      deleteServiceUI(service._id)
      onClose();
      toast.success('Servicio eliminado correctamente');
    } catch (error) {
      toast.error('Oops.. hubo un error vuelva a intentar mas tarde');
    }
  };

  return (
    <Modal placement="center" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>{'Confirmación'}</h2>
        </ModalHeader>
        <ModalBody>
          <p>
            {'¿Esta seguro/a de que desea eliminar el servicio '}
            <span className="font-semibold text-secondary-500">{service.title}</span>{'?'}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteServiceModal;
