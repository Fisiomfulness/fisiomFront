"use client";
import { Card, CardBody, Chip } from "@nextui-org/react";

const ServicioPrecioCard = ({ experiencia }) => {
  return (
    <>
      {experiencia?.length ? (
        experiencia.map((experiencia, index) => (
          <div key={index} className="flex flex-col lg:flex-row   mt-2">
            <Card
              isBlurred
              className="border-none w-full bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-6 lg:p-4 md:rounded"
              shadow="sm"
            >
              <CardBody>
                <div className="flex  items-center ">
                  <div className="flex flex-col gap-3 p-5  ">
                    <h3>{experiencia.date}</h3>
                    <Chip
                      size="md"
                      className="bg-[#36A793] p-2"
                      variant="faded"
                    >
                      <p className="text-large font-bold text-foreground/80 ">
                        {experiencia.institution}
                      </p>
                    </Chip>
                    <p className="text-medium">{experiencia.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))
      ) : (
        <>
          <div className="flex flex-col lg:flex-row mt-2">
            <Card
              isBlurred
              className="border-none w-full bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-6 lg:p-8 md:rounded"
              shadow="sm"
            >
              <CardBody>
                <div className="flex  items-center ">
                  <div className="flex flex-col gap-3 p-5 w-full">
                    <p className="text-medium text-center">
                      Este profesional no ha cargado su experiencia.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default ServicioPrecioCard;
