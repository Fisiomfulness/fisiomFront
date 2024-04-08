"use client";
import { Card, CardBody, Chip } from "@nextui-org/react";

const ServicioPrecioCard = ({ experiencia }) => {
  return (
    <>
      {experiencia.map((experiencia, index) => (
        <div key={index} className="flex flex-col lg:flex-row   mt-2">
          <Card
            isBlurred
            className="border-none w-full  bg-background/60 dark:bg-default-100/50 max-w-[1118px] rounded-r-none md:rounded"
            shadow="sm"
          >
            <CardBody>
              <div className="flex  items-center ">
                <div className="flex flex-col gap-3 p-5  ">
                  <h2>{experiencia.fecha}</h2>
                  <Chip
                    size="md"
                    className="bg-[#36A793] p-2"
                    variant="faded"
                  >
                    <p className="text-large font-bold text-foreground/80 ">
                      {experiencia.institucion}
                    </p>
                  </Chip>
                  <p className="text-medium  ">{experiencia.descripcion}</p>
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
