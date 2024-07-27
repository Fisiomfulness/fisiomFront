//"use client";
import { Card, CardHeader, CardBody, Chip, Button } from "@nextui-org/react";
import Link from "next/link";

const ServicioPrecioCard = ({ servicios, detallesId }) => {
  return (
    <>
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center mt-2 pb-2"
        >
          <Card
            isBlurred
            className="border-none w-full  bg-[#D8EEF8] dark:bg-default-100/50 max-w-[1118px] min-h-[160px] rounded-r-none md:rounded px-4"
            shadow="sm"
          >
            <CardHeader className="pl-4 pt-4 pb-0">
              <Chip
                size="md"
                className="bg-[#70FF2D] px-3 ml-2"
                variant="faded"
              >
                <p className="text-[12px] font-bold text-foreground/60 ">
                  SERVICIO
                </p>
              </Chip>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-4 gap-3  items-center pt-1">
                <div className="flex flex-col col-span-4 lg:col-span-2  gap-3 px-4 items-center">
                  <p className="text-medium  lg:w-full">
                    {servicio.serviceDescription}
                  </p>
                </div>
                <div className="flex col-span-2 lg:col-span-1 items-center justify-center">
                  <p className="font-semibold text-[18px]">
                    S. {servicio.serviceCost}
                  </p>
                </div>
                <div className="flex lg:basis-1/4  col-span-2 lg:col-span-1 justify-center items-center">
                  <Link
                    href={`/servicios/${detallesId}/turno`}
                    className="w-full"
                  >
                    <Button
                      className="w-full p-6 rounded-[5px] text-[12px] font-semibold"
                      color="primary"
                    >
                      RESERVAR CITA
                    </Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ServicioPrecioCard;
