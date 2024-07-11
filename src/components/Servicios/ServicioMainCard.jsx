"use client";
import { FaUserDoctor } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import NextLink from "next/link";
import { Card, CardBody, Chip, Avatar, Link, Button } from "@nextui-org/react";

// Fix de StarRatings
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioMainCard = ({ profesional }) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 shadow-gray-200 w-full dark:bg-default-100/50 rounded-none"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col overflow-hidden gap-2">
          <div className="grid grid-cols-[max-content,auto] items-center gap-4">
            <Avatar
              src={profesional.image || "/doctor-ejemplo.png"}
              className="w-16 h-16 sm:w-20 sm:h-20 ml-1"
            />
            <div className="flex flex-col gap-0">
              <h2 className="font-semibold uppercase mb-0 line-clamp-2 text-sm sm:text-medium text-[#003953] w-full">
                {profesional.name}
              </h2>
              {profesional.specialties.length ? (
                <div className="flex flex-wrap gap-1 my-1">
                  {profesional.specialties.map((specialty) => (
                    <Chip
                      key={specialty._id}
                      className="bg-primary-400"
                      variant="flat"
                      size="sm"
                      radius="sm"
                      startContent={<FaUserDoctor className="text-white" />}
                      classNames={{
                        base: "px-2 flex gap-1",
                      }}
                    >
                      <p className="text-small text-primary-50 truncate">
                        {specialty.name}
                      </p>
                    </Chip>
                  ))}
                </div>
              ) : null}
              <StarRatings
                rating={profesional.averageScore.average}
                starRatedColor="#ffb829"
                numberOfStars={5}
                starDimension="14px"
                starSpacing="2px"
                name="rating"
              />
              <Link
                className="text-small w-fit italic mt-1 underline"
                as={NextLink}
                href={`./servicios/${profesional._id}/perfil`}
              >
                Ver más
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-[max-content,auto] items-center gap-2">
              <CiLocationOn className="text-primary-400 size-7 sm:size-8" />
              <p className="line-clamp-2 font-semibold text-sm sm:text-base">
                {profesional?.address?.city
                  ? `${profesional?.address?.city}, ${
                      profesional?.address?.state
                        ? profesional.address?.state + ", "
                        : ""
                    }${profesional.address?.country}`
                  : "A consultar"}
              </p>
            </div>
            <div className="flex  items-center gap-2 ">
              <RiMoneyDollarCircleLine className="text-primary-400 size-7 sm:size-8" />
              <div className="flex  flex-col">
                <p className="font-bold text-sm sm:text-base">Consulta</p>

                <p>$ {profesional.consultationPrice || "-"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div>
              <Link href={`./servicios/${profesional._id}/turno`}>
                <Button 
                  color="secondary" 
                  size="lg"
                  radius="sm"
                >
                  Agendar Cita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ServicioMainCard;
