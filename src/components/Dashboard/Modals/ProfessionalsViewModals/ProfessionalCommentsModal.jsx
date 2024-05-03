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
import { FaRankingStar } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import DeleteCommentModal from './DeleteCommentModal';
import { IoMdReturnLeft } from 'react-icons/io';
const score = [
  {
    _id: 1,
    title: 'Jorge',
    description: 'Este es un comentario de prueba',
    score: 5,
  },
  {
    _id: 2,
    title: 'Gaston',
    description: 'Este es un comentario de prueba',
    score: 2,
  },
  {
    _id: 3,
    title: 'Khjons',
    description: 'Este es un comentario de prueba',
    score: 4,
  },
  {
    _id: 4,
    title: 'Felipe',
    description: 'Este es un comentario de prueba',
    score: 1,
  },
  {
    _id: 5,
    title: 'Laila',
    description: 'Este es un comentario de prueba',
    score: 2,
  },
  {
    _id: 6,
    title: 'David',
    description: 'Este es un comentario de prueba',
    score: 0,
  },
];
export default function ProfessionalCommentsModal({ professional }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const emojiSelector = (score) => {
    switch (score) {
      case 5:
        return '😀';
      case 4:
        return '🙂';
      case 3:
        return '😐';
      case 2:
        return '😠';
      case 1:
        return '😡';
      default:
        return '😶';
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-primary-500 font-semibold text-white"
        startContent={<FaRankingStar className="text-2xl" />}
      >
        Opiniones
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-w-[30rem] bg-zinc-100  max-h-[30rem]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                <p> Opiniones sobre {professional.name}</p>
                <Divider className="w-[80%]" />
              </ModalHeader>
              <ModalBody className="overflow-auto">
                <div className="w-full flex flex-col gap-1 py-1 px-2 ">
                  {score.map((score) => (
                    <div
                      key={score._id}
                      className="relative w-full flex flex-col px-3 py-2 border rounded-lg bg-zinc-100"
                    >
                      <span className="absolute top-0 right-0 font-light text-sm">
                        Rating: {score.score} {emojiSelector(score.score)}
                      </span>
                      <p className="text-medium font-bold">
                        <span className="font-normal text-medium">
                          {' '}
                          Comentario de:
                        </span>{' '}
                        {score.title}
                      </p>
                      <p className="text-sm">{score.description}</p>
                      <DeleteCommentModal comment={score} />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  endContent={<IoMdReturnLeft className="text-2xl" />}
                  onPress={onClose}
                >
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
