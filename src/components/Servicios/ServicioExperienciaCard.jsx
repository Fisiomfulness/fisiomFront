'use client';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

// ? Example -> Mes:2 Año:2024 => Feb. 2024
const formatExperienceDates = (experience) => {
  const startDate = parse(
    `${experience.startDateYear}-${experience.startDateMonth}`,
    'yyyy-M',
    new Date()
  );
  const startFormatted = format(startDate, 'MMM. yyyy', { locale: es });

  if (experience.current) {
    return `${startFormatted} - Presente`;
  }

  const endDate = parse(
    `${experience.endDateYear}-${experience.endDateMonth}`,
    'yyyy-M',
    new Date()
  );
  const endFormatted = format(endDate, 'MMM. yyyy', { locale: es });

  return `${startFormatted} - ${endFormatted}`;
};

const ServicioExperienciaCard = ({ experience }) => {
  return (
    <>
      {experience.length > 0 ? (
        experience.map((exp) => (
          <Card
            key={exp._id}
            isHoverable
            radius="none"
            shadow="none"
            className="bg-[#EBF7FB] p-1 lg:p-3 lg:px-9 hover:!bg-[#D8EEF8] overflow-visible"
          >
            <CardHeader className="flex-col gap-1 md:flex-row md:gap-3 justify-between">
              <h3 className="m-0 text-center text-lg font-semibold tracking-wide text-secondary-400">
                {exp.title}
              </h3>
              <span className="uppercase text-nowrap text-sm text-secondary-600 italic">
                {formatExperienceDates(exp)}
              </span>
            </CardHeader>
            <CardBody className="pt-0">
              <Chip
                size="sm"
                variant="flat"
                className="bg-[#64efbce2] px-3"
                classNames={{
                  content:
                    'text-[#164a37e2] uppercase font-semibold tracking-wider',
                }}
              >
                {exp.company}
              </Chip>
              <p className="mt-2 break-all">{exp.description}</p>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card
          radius="none"
          shadow="none"
          className="h-full bg-[#EBF7FB] p-3 lg:px-9"
        >
          <CardBody>
            <p className="m-auto text-center text-lg font-semibold tracking-wide text-secondary-400">
              Este profesional no ha cargado su experiencia
            </p>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default ServicioExperienciaCard;
