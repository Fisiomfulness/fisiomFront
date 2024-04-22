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
    <div className="flex flex-col ">
      <Card
        isBlurred
        className="border-none bg-background/60 w-[40vw] dark:bg-default-100/50  rounded-r-none lg:rounded "
        shadow="sm"
      >
        <CardBody>
          <div className="flex flex-col  ">
            <div className="flex items-center p-2 gap-4">
              <Avatar
                src={profesional.image || "/doctor-ejemplo.png"}
                className="w-20 h-20 text-large"
              />
              <div className="flex flex-col gap-0">
                <h1 className="font-semibold text-medium">
                  {profesional.name}
                </h1>
                <div className="flex flex-wrap gap-1">
                  {profesional.specialties.length
                    ? profesional.specialties.map((specialty) => (
                        <div key={specialty._id}>
                          <Chip
                            className="bg-primary-300"
                            variant="faded"
                            size="sm"
                            startContent={<FaUserDoctor />}
                          >
                            <p className="text-small text-foreground/80">
                              {specialty.name}
                            </p>
                          </Chip>
                        </div>
                      ))
                    : null}
                  <div className="w-full"></div>
                  <div className="pl-2">
                    <StarRatings
                      rating={profesional.avgScore}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="14px"
                      starSpacing="2px"
                      name="rating"
                    />
                  </div>
                </div>
                <Link
                  className="text-small p-2 text text-decoration-line: underline"
                  as={NextLink}
                  href={`./servicios/detalles${profesional._id}/perfil`}
                >
                  Ver mas
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex  items-center gap-2 ">
                <CiLocationOn className="text-primary-300 w-8 h-8" />
                <div className="flex  flex-col max-w-[70%]">
                  <p className="font-bold">{profesional.address}</p>
                </div>
              </div>
              <div className="flex  items-center gap-2 ">
                <RiMoneyDollarCircleLine className="text-primary-300 w-8 h-8" />
                <div className="flex  flex-col">
                  <p className="font-bold">Consulta</p>

                  <p>$ {profesional.consultationPrice || "-"}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                as={NextLink}
                href={`./servicios/detalle${profesional._id}/turno`}
                color="secondary"
                size="sm"
                className="w-[50%]"
              >
                Agenda turno
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServicioMainCard;
