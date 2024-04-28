import { useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';
import BlogForm from '../BlogForm';

const EditBlogModal = ({ handleUpdate, types, initialValues, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="p-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="size-full flex flex-col overflow-hidden border-2 border-gray-200 max-w-[580px] p-4 shadow-lg sm:p-8 bg-white">
        <div className="flex gap-1 items-center justify-between mb-5">
          <h2 className="m-0">Edición</h2>
          <Button color="danger" size="sm" onPress={onClose}>
            <IoMdClose className="fill-white size-4" />
          </Button>
        </div>
        <BlogForm handleUpdate={handleUpdate} types={types} initialValues={initialValues} mode="update" />
      </div>
    </div>
  );
};

export default EditBlogModal;
