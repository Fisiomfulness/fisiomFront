'use client';
import {
  Card,
  CardBody,
  Image,
  Chip,
  CardFooter,
  Divider,
  Snippet,
} from '@nextui-org/react';
import { FaUserDoctor } from 'react-icons/fa6';
import { CiMail } from 'react-icons/ci';
import { IoIosCall } from 'react-icons/io';
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});
const ProfileMap = dynamic(() => import('./utils/ProfileMap'), {
  ssr: false,
});

const ServicioProfesionalCard = ({ professional }) => {
  return (
    <div className="!w-full grid gap-3 xl:items-stretch xl:grid-cols-[70%,auto] xl:gap-10">
      <Card shadow="none" radius="none" fullWidth>
        <CardBody className="grid gap-5 lg:grid-cols-[38%,auto] lg:pt-0 lg:items-stretch">
          <div className="grid gap-2 md:gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Image
              alt={professional.name}
              src={professional.image || '/doctor-ejemplo.png'}
              className="text-center size-full h-[300px] max-h-[300px] object-cover object-top"
              radius="none"
              shadow="none"
              removeWrapper
            />
            <div className="hidden sm:block lg:hidden">
              <ProfileMap center={professional.coordinates} zoom={13} />
            </div>
          </div>

          <div className="vstack gap-2">
            <h2 className="m-0 uppercase">{`DR. ${professional.name}`}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {professional?.specialties.length > 0 &&
                professional.specialties.map((specialty) => (
                  <Chip
                    key={specialty._id}
                    variant="flat"
                    size="sm"
                    startContent={<FaUserDoctor className="text-[#164a37e2]" />}
                    className="bg-[#acf5da] px-3 gap-1 items-center"
                    classNames={{
                      content: 'text-[#164a37e2] tracking-wider',
                    }}
                  >
                    {specialty.name}
                  </Chip>
                ))}
            </div>
            <p
              className={`text-sm ${
                !professional.description && 'text-secondary-400 font-semibold'
              }`}
            >
              {professional.description ||
                'Profesional verificado de Fisiomfulness'}
            </p>
          </div>
        </CardBody>

        <Divider />

        <CardFooter className="flex-col gap-2 bg-default-50 sm:flex-row">
          <Snippet
            symbol={<CiMail size={24} />}
            color="primary"
            variant="flat"
            radius="none"
            fullWidth
            tooltipProps={{
              color: 'secondary',
              content: 'Copiar correo electrónico',
              delay: 200,
            }}
            className="bg-transparent"
            classNames={{
              pre: 'flex items-center gap-2',
            }}
          >
            <span className="text-black font-sans">{professional.email}</span>
          </Snippet>
          <Snippet
            symbol={<IoIosCall size={24} />}
            color="primary"
            variant="flat"
            radius="none"
            fullWidth
            tooltipProps={{
              color: 'secondary',
              content: 'Copiar teléfono',
              delay: 200,
            }}
            className="bg-transparent"
            classNames={{
              color: 'secondary',
              pre: 'flex items-center gap-2',
            }}
          >
            <span className="text-black font-sans">{professional.phone}</span>
          </Snippet>
        </CardFooter>
      </Card>
      
      <div className="h-auto sm:hidden lg:block">
        <ProfileMap center={professional.coordinates} zoom={13} />
      </div>
    </div>
  );
};

export default ServicioProfesionalCard;
