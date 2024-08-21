'use client';
import { Button, Tooltip, Pagination } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import { RxPencil1, RxTrash } from 'react-icons/rx';
import { getServices } from '@/services/professionals';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { myServicesAtom } from '../store/my_services';
import NoServicesUI from './NoServicesUI';
import EditServiceModal from './EditServiceModal';
import DeleteServiceModal from './DeleteServiceModal';
import ServicesTable from './ServicesTable';
import Loader from '@/components/Loader';

const MyServices = ({ query, professionalId, data }) => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToHandle, setServiceToHandle] = useState(null);

  useHydrateAtoms([[myServicesAtom, data]]);
  const { services, totalServices } = useAtomValue(myServicesAtom);
  
  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) return <Loader />;

  if (!services.length) return <NoServicesUI />;

  return (
    <Fragment>
      <EditServiceModal
        professionalId={professionalId}
        service={serviceToHandle}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setServiceToHandle(null);
        }}
      />
      <DeleteServiceModal
        service={serviceToHandle}
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setServiceToHandle(null);
        }}
      />
      <h1 className="text-center font-sans uppercase bg-gradient-to-r from-primary-600 to-primary-800 inline-block text-transparent bg-clip-text">
        {`Tus servicios (${totalServices || 0})`}
      </h1>
      <div className="w-full h-[520px] pr-2 overflow-auto xl:w-[94%]">
        <ServicesTable
          services={services}
          setEditModalOpen={setEditModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          setServiceToHandle={setServiceToHandle}
        />
      </div>
    </Fragment>
  );
};

export default MyServices;
