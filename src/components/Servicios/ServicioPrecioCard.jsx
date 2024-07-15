'use client';
import { Button, Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { capitalizeFirstLetter, startWhatsAppChat } from '@/utils/helpers';

// ? Se esta trabajando con el numero de la empresa.
const REDIRECT_PHONE = 51901294627;

const ServicioPrecioCard = ({ services }) => {
  return (
    <>
      {services.length > 0 ? (
        services.map((service) => (
          <Card
            key={service._id}
            isHoverable
            radius="none"
            shadow="none"
            className="bg-[#EBF7FB] p-1 lg:p-3 lg:px-9 hover:!bg-[#D8EEF8] overflow-visible"
          >
            <CardHeader>
              <h3 className="m-0 text-sm rounded-full bg-[#64efbce2] px-5 py-1 text-[#164a37e2] uppercase font-semibold break-all tracking-wider line-clamp-3">
                {service.title}
              </h3>
            </CardHeader>
            <CardBody className="pt-0 grid xl:grid-cols-[2.5fr,0.5fr,1fr] items-center gap-3">
              <p className="text-justify">{service.description}</p>
              <p className="text-center font-semibold text-secondary-500 font-sans">{`$ ${service.price}`}</p>
              <Button
                color="primary"
                radius="none"
                fullWidth
                className="bg-[#2984AE] uppercase tracking-wide max-w-[300px] mx-auto font-semibold"
                onPress={() =>
                  startWhatsAppChat(
                    REDIRECT_PHONE,
                    `Hola, me encuentro interesado/a en el servicio "${
                      service.title
                    }" proporcionado por el/la profesional "${capitalizeFirstLetter(
                      service?._professional.name || ''
                    )}". Por lo tanto, me gustaría conocer los detalles necesarios para programar una cita. Quedo atento/a a su respuesta, saludos.`
                  )
                }
              >
                Reservar cita
              </Button>
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
              Este profesional no ha cargado sus servicios
            </p>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default ServicioPrecioCard;
