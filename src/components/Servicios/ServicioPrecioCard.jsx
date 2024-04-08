"use client";
import { Card, CardBody, Chip, Button } from "@nextui-org/react";

const ServicioPrecioCard = ({ servicios }) => {
 
  return (
    <>
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center mt-2"
        >
          <Card
            isBlurred
            className="border-none w-full  bg-background/60 dark:bg-default-100/50 max-w-[1118px] rounded-r-none md:rounded"
            shadow="sm"
          >
            <CardBody>
              <div className="grid grid-cols-4 gap-3  items-center ">
                <div className="flex flex-col col-span-4 lg:col-span-2  gap-3 p-5  ">
                  <Chip
                    size="lg"
                    className="bg-[#36A793] p-2"
                    variant="faded"
                  >
                    <p className="text-large font-bold text-foreground/80 ">
                      {servicio.nombre}
                    </p>
                  </Chip>
                  <p className="text-medium  lg:w-full">
                    {servicio.descripcion}
                  </p>
                </div>
                <div className="flex col-span-2 lg:col-span-1 items-center justify-center">
                  <h2>Precio: {servicio.precio}</h2>
                </div>
                <div className="flex lg:basis-1/4  col-span-2 lg:col-span-1 justify-center">
                  <Button className="p-5" size="lg" color="primary">
                    RESERVAR CITA
                  </Button>
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
