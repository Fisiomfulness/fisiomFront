'use client';
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
  Chip,
} from '@nextui-org/react';
import { CiCircleInfo } from 'react-icons/ci';
import Image from 'next/image';
import { FaRegIdCard, FaStar } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaCalendarCheck, FaLocationDot } from 'react-icons/fa6';
import { GiSkills } from 'react-icons/gi';
import AboutProfessionalModal from './AboutProfessionalModal';
import ProfessionalCommentsModal from './ProfessionalCommentsModal';
import { ImProfile } from 'react-icons/im';

export default function ProfessionalInfoModal({ professional }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const gender = professional.gender == 'Masculino' ? 'Dr.' : 'Dra.';
  const name = gender + ' ' + professional.name;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
  };
  return (
    <>
      <button
        onClick={() => {
          onOpen();
        }}
        className="flex items-center justify-start rounded-full "
      >
        <CiCircleInfo className="text-2xl" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="grid grid-cols-5 gap-2">
                  <div
                    className="col-span-3 flex flex-col gap-2"
                    style={{ width: '100%' }}
                  >
                    <div className="relative ">
                      <Chip
                        className=" border-none absolute -left-[10px]"
                        color={professional.confirmEmail ? 'success' : 'danger'}
                        size="md"
                        title={
                          professional.confirmEmail ? 'Confirmado' : 'Pendiente'
                        }
                        variant="dot"
                      ></Chip>
                      <p className="text-lg text-center ">{name}</p>
                    </div>
                    <Divider className="bg-primary-500" />
                    <p
                      className="flex gap-1 items-center text-default-700 text-sm overflow-hidden whitespace-nowrap"
                      title={professional.email}
                    >
                      <MdOutlineMail className="text-xl text-primary-500" />
                      <span className="truncate">{professional.email}</span>
                    </p>

                    <p
                      className="flex gap-1 items-center text-default-700 text-sm "
                      title="Matrícula"
                    >
                      <FaRegIdCard className="text-xl text-primary-500" />
                      {professional.license}
                    </p>
                    <p className="flex gap-1 items-center text-default-700 text-sm ">
                      <FaPhoneAlt className="text-xl text-primary-500" />
                      {professional.phone}
                    </p>
                    <p
                      className="flex gap-1 items-center text-default-700 text-sm overflow-hidden whitespace-nowrap"
                      title={professional.address}
                    >
                      <FaLocationDot className="text-xl text-primary-500" />
                      <span className="truncate">{professional.address}</span>
                    </p>
                  </div>
                  <div className="col-span-2 relative flex justify-center items-center">
                    <p className="absolute bottom-0 right-1 z-10 text-yellow-400 text-xl flex bg-default-900 rounded-full px-2  items-center justify-center hover:scale-90 bg-opacity-60 transition-all">
                      {professional.avgScore}{' '}
                      <FaStar className="text-yellow-400" />
                    </p>
                    <Image
                      width={150}
                      height={150}
                      alt={professional.name}
                      src={professional.image}
                      className="rounded-lg object-cover w-[150px] h-[150px] hover:opacity-90  transition-all"
                    />
                  </div>
                </div>
                <Divider className="mt-5 w-full bg-primary-500" />
              </ModalHeader>
              <ModalBody>
                <div className=" flex flex-col gap-1">
                  <p className="flex gap-1 items-center text-default-700 text-sm ">
                    {' '}
                    <GiSkills className="text-xl text-primary-500" />{' '}
                    <span className="font-bold">Especialidades:</span>
                    {professional.specialties.map((specialty, i) => (
                      <span key={specialty._id}>
                        {' '}
                        {specialty.name}
                        {i === professional.specialties.length - 1 ? '.' : ','}
                      </span>
                    ))}
                  </p>
                  <p className="flex gap-1 items-center text-default-700 text-sm ">
                    <FaCalendarCheck className="text-xl text-primary-500" />
                    <span className="font-bold">
                      Registrado en:{' '}
                      <span className="font-normal">
                        {formatDate(professional.createdDate)}
                      </span>
                    </span>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <AboutProfessionalModal professional={professional} />
                <Button
                  startContent={<ImProfile className="text-2xl" />}
                  className="bg-primary-500 font-semibold text-white"
                >
                  <a
                    href={professional.curriculum}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir CV
                  </a>
                </Button>
                <ProfessionalCommentsModal professional={professional} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
