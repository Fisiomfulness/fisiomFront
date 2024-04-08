"use client";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { Card, CardBody, Image, Chip, CardFooter } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
// Fix de StarRatings
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioProfesionalCard = ({ profesional }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[800px] rounded-r-none lg:rounded "
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-4 items-center justify-center">
            <div className="relative col-span-6 lg:col-span-4">
              <Image
                alt={profesional.nombre}
                className="object-cover"
                height={200}
                shadow="md"
                src="/doctor-ejemplo.png"
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 lg:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-foreground/90">
                    {profesional.nombre}
                  </h1>
                  <div className="flex justify-between">
                    <Chip
                      className="bg-primary-300"
                      variant="faded"
                      startContent={<FaUserDoctor />}
                    >
                      <p className="text-small text-foreground/80">
                        {profesional.especialidad}
                      </p>
                    </Chip>
                    <StarRatings
                      rating={profesional.rating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      name="rating"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <div className="flex justify-between">
                  <p className="text-small">{profesional.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>

        <Divider />
        <CardFooter>
          <div className="flex w-full justify-between">
            <Snippet symbol="" variant="shadow" color="primary">
              <div className="flex flex-row gap-2 items-center">
                <CiMail />
                {profesional.mail}
              </div>
            </Snippet>
            <Snippet symbol="" variant="shadow" color="success">
              <div className="flex flex-row gap-2 items-center">
                <IoIosCall />

                <span>{profesional.telefono}</span>
              </div>
            </Snippet>
          </div>
        </CardFooter>
      </Card>
      <Card
        isBlurred
        className="border-none p-3 bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[290px] rounded lg:rounded-l-none h-[262px]"
        shadow="sm"
      >
        <Image
          alt={profesional.nombre}
          className="object-cover"
          height={200}
          shadow="sm"
          src="/servicio-ubicacion-profesionales.png"
          width="100%"
        />
      </Card>
    </div>
  );
};

export default ServicioProfesionalCard;
