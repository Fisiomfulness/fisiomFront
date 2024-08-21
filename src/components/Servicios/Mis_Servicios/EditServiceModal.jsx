import React from 'react';
import ServiceForm from '../ServiceForm';
import { Modal, ModalContent } from '@nextui-org/react';

const EditServiceModal = ({ professionalId, service, isOpen, onUpdate, onClose }) => {
  if (!isOpen || !service) return null;

  return (
    <Modal
      radius="sm"
      placement="center"
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      className="px-auto py-10"
    >
      <ModalContent>
        <ServiceForm
          professionalId={professionalId}
          initialValues={service}
          isUpdate={true}
          onUpdate={onUpdate}
          onSubmit={onClose}
        />
      </ModalContent>
    </Modal>
  );
};

export default EditServiceModal;
