import { useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="shadow-lg backdrop:bg-black/50 p-8 rounded-lg flex flex-col gap-2"
    >
      <h2 className="text-2xl mb-0">Confirmación</h2>
      <p>Esta seguro/a de que desea eliminar este blog?</p>
      <div className="flex gap-2 justify-end mt-3">
        <Button color="primary" onPress={onClose}>
          Cancelar
        </Button>
        <Button
          color="danger"
          onPress={() => onConfirm('delete')}
        >
          Eliminar
        </Button>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
