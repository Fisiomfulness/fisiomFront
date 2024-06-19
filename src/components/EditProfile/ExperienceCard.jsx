import { Button } from '@nextui-org/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDate = (date) => {
  const formattedDate = format(new Date(date), 'MMM. yyyy', { locale: es });
  return capitalizeFirstLetter(formattedDate);
};

const ExperienceCard = ({ experience }) => {
  return (
    <div className="flex flex-col gap-1 rounded-sm bg-[#EBF7FB] py-2 px-3 w-full overflow-hidden">
      <div className="flex items-center gap-2 justify-between">
        <h4 className="font-bold m-0 line-clamp-1">{experience.title}</h4>
        <span className="text-sm text-nowrap">{`${formatDate(
          experience.startDate
        )} - ${
          experience.current ? 'Presente' : formatDate(experience.endDate)
        }`}</span>
      </div>
      <p className="w-fit max-w-[50%] rounded-full bg-primary-300/80 text-secondary-500 text-xs truncate font-medium tracking-wide py-1 px-3">
        {experience.company}
      </p>
      <div className="flex items-center gap-2 justify-between">
        <p className="line-clamp-1">{experience.description}</p>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            radius="full"
            className="bg-transparent border-2 border-transparent hover:border-secondary-300"
          >
            <FaEdit size={20} className="text-secondary-400" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            radius="full"
            className="bg-transparent border-2 border-transparent hover:border-danger-300"
          >
            <FaTrash size={18} className="text-danger-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
