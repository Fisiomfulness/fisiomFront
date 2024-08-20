import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';
import { myServicesAtom } from '../store/my_services';
import { getServices } from '@/services/professionals';
import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { RxPencil1, RxTrash } from 'react-icons/rx';

const ServicesTable = ({
  services,
  setEditModalOpen,
  setDeleteModalOpen,
  setServiceToHandle,
}) => {
  const [store, setStore] = useAtom(myServicesAtom);
  const [fetchingMore, setFetchingMore] = useState(false);
  const { ref: bottomTableRef, inView } = useInView();

  const fetchMoreServices = () => {
    if (!fetchingMore) {
      setFetchingMore(true);
      getServices({ ...store.query, offset: store.services.length })
        .then((data) =>
          setStore({ ...store, ...data, services: [...store.services, ...data.services] })
        )
        .finally(() => setFetchingMore(false));
    }
  };

  useEffect(() => {
    if (inView && store.hasMoreToLoad) fetchMoreServices();
  }, [inView]);

  return (
    <table className="w-full text-left text-black rounded-sm shadow-sm">
      <thead className="text-white bg-primary text-center">
        <tr className="[&>*]:px-6 [&>*]:py-3 [&>*]:border-white [&>*]:font-normal [&>*]:border-r-2 [&>*:nth-child(even)]:bg-[#2984AE]">
          <th className="min-w-[150px] w-[25%]">Servicio</th>
          <th className="min-w-[200px]">Descripción</th>
          <th className="w-[8ch]">Precio</th>
          <th className="w-[150px] border-r-0" />
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr
            key={service._id}
            className="odd:bg-[#D1E7F1] even:bg-[#E7F0F4] border-t-4 border-white"
          >
            <td className="px-8 py-3 font-medium flex flex-row items-center gap-0">
              <p className="w-full px-4 text-start">{service.title}</p>
            </td>
            <td className="px-8 py-3">
              <p className="line-clamp-6 whitespace-break-spaces text-justify">
                {service.description}
              </p>
            </td>
            <td className="px-12 py-3 align-top whitespace-nowrap">
              $ {service.price}
            </td>
            <td className="px-12 py-3">
              <div className="w-full center gap-8">
                <Tooltip
                  content="Eliminar"
                  size="sm"
                  color="secondary"
                  closeDelay={200}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    className="bg-transparent"
                    onPress={() => {
                      setDeleteModalOpen(true);
                      setServiceToHandle(service);
                    }}
                  >
                    <RxTrash className="text-primary text-2xl" />
                  </Button>
                </Tooltip>
                <Tooltip
                  content="Editar"
                  size="sm"
                  color="secondary"
                  closeDelay={200}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    className="bg-transparent"
                    onPress={() => {
                      setEditModalOpen(true);
                      setServiceToHandle(service);
                    }}
                  >
                    <RxPencil1 className="text-primary text-2xl" />
                  </Button>
                </Tooltip>
              </div>
            </td>
          </tr>
        ))}
        <div ref={bottomTableRef}>{fetchingMore && <Spinner />}</div>
      </tbody>
    </table>
  );
};

export default ServicesTable;
