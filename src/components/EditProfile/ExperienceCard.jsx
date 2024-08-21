import { Button, Tooltip } from '@nextui-org/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

// ? Example -> Mes:2 Año:2024 => Feb. 2024
const formatExperienceDates = (experience) => {
  const startDate = parse(`${experience.startDateYear}-${experience.startDateMonth}`, 'yyyy-M', new Date());
  const startFormatted = capitalizeFirstLetter(
    format(startDate, 'MMM. yyyy', { locale: es })
  );

  if (experience.current) {
    return `${startFormatted} - Presente`;
  }

  const endDate = parse(`${experience.endDateYear}-${experience.endDateMonth}`, 'yyyy-M', new Date());
  const endFormatted = capitalizeFirstLetter(format(endDate, 'MMM. yyyy', { locale: es }));

  return `${startFormatted} - ${endFormatted}`;
};

const ExperienceCard = ({ experience, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-1 rounded-sm bg-[#EBF7FB] py-2 px-3 w-full">
      <div className="flex items-center gap-2 justify-between">
        <h4 className="font-bold m-0 line-clamp-1">{experience.title}</h4>
        <span className="text-sm text-nowrap">
          {formatExperienceDates(experience)}
        </span>
      </div>
      <p className="w-fit max-w-[50%] rounded-full bg-primary-300/80 text-secondary-500 text-xs truncate font-medium tracking-wide py-1 px-3">
        {experience.company}
      </p>
      <div className="flex items-center gap-2 justify-between">
        <p className="line-clamp-1">{experience.description}</p>
        <div className="flex items-center gap-2">
          <Tooltip content="Editar" size="sm" color="secondary" placement="bottom" closeDelay={200}>
            <Button
              isIconOnly
              size="sm"
              radius="full"
              onPress={onEdit}
              className="bg-transparent border-2 border-transparent hover:border-secondary-300"
            >
              <FaEdit size={20} className="text-secondary-400" />
            </Button>
          </Tooltip>
          <Tooltip content="Eliminar" size="sm" color="secondary" placement="bottom" closeDelay={200}>
            <Button
              isIconOnly
              size="sm"
              radius="full"
              onPress={onDelete}
              className="bg-transparent border-2 border-transparent hover:border-danger-300"
            >
              <FaTrash size={18} className="text-danger-500" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
