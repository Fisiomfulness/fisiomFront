import { Button, Tooltip } from '@nextui-org/react';
import { RxPencil1, RxTrash } from 'react-icons/rx';

function CustomTableBody({ services }) {
  return (
    <tbody>
      {services.map((service) => (
        <tr
          key={service._id}
          className="odd:bg-[#D1E7F1] even:bg-[#E7F0F4] border-t-4 border-white"
        >
          <td className="px-8 py-3 font-medium flex flex-row items-center gap-0 min-h-fit">
            <p className="w-full px-4 text-start">{service.title}</p>
          </td>
          <td className="px-8 py-3">
            <p className="line-clamp-6 whitespace-break-spaces max-w-xl text-justify">
              {service.description}
            </p>
          </td>
          <td className="px-12 py-3 align-top whitespace-nowrap">
            $ {service.price}
          </td>
          <td className="px-12 py-3">
            <div className="flex flex-row gap-8">
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
                >
                  <RxPencil1 className="text-primary text-2xl" />
                </Button>
              </Tooltip>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default CustomTableBody;
