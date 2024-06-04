import { Button } from '@nextui-org/react';
import { RiDeleteBinFill } from 'react-icons/ri';

const DeleteTab = ({ showTab, openModal, deleteBtnHeight }) => {
  if (!showTab) return null;
  return (
    <div
      className="absolute w-[60px] bg-inherit p-1 right-0 rounded-t-md"
      style={{ height: deleteBtnHeight, top: `-${deleteBtnHeight}` }}
    >
      <Button
        type="button"
        color="danger"
        radius="sm"
        fullWidth
        className="!size-full min-w-0"
        onPress={openModal}
      >
        <RiDeleteBinFill />
      </Button>
    </div>
  );
};

export default DeleteTab;
