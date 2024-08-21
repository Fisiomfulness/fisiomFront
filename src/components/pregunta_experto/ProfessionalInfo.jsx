import { Image } from '@nextui-org/react';
import { CustomButton } from '@/features/ui';
import Link from 'next/link';

const ProfessionalInfo = ({ professional }) => {
  return (
    <div className="grid grid-cols-2 items-center justify-center place-items-center gap-2 sm:grid-cols-none">
      <Image
        src={professional.image}
        alt={`Doctor ${professional.name} photo`}
        className="rounded-full size-14 bg-cover basis-2/5"
      />
      <div className="flex flex-col max-w-28 gap-1 w-full">
        <p className="font-bold capitalize truncate">
          {'Dr. ' + professional.name}
        </p>
        <div className="divide-y-1">
          <CustomButton
            as={Link}
            target="_blank"
            href={`/servicios/${professional._id}/perfil`}
            className="py-0 w-full rounded-sm font-normal"
          >
            Ver perfil
          </CustomButton>
          <CustomButton
            as={Link}
            target="_blank"
            href={`/servicios/${professional._id}/turno`}
            className="py-0 w-full rounded-sm font-normal"
          >
            CITA
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
