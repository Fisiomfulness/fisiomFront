"use client";
import { FaUserDoctor } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import {
  Card,
  CardBody,
  Image,
  Chip,
  CardFooter,
  Divider,
  Snippet,
} from "@nextui-org/react";

// Fix de StarRatings
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioProfesionalCard = ({ profesional }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 items-center lg:items-start">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[800px] rounded-r-none lg:rounded"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 lg:gap-4 items-start">
            <div className="relative col-span-6 lg:col-span-4 mt-2">
              <Image
                alt={profesional.name}
                className="object-cover"
                height={200}
                shadow="md"
                src={profesional.image || "/doctor-ejemplo.png"}
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 lg:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-foreground/90">
                    {profesional.name}
                  </h1>
                  <div className="flex flex-wrap gap-1">
                    {profesional.specialties?.length
                      ? profesional.specialties.map((specialty) => (
                          <div key={specialty._id}>
                            <Chip
                              className="bg-primary-300"
                              variant="faded"
                              size="md"
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
                    <StarRatings
                      rating={profesional?.averageScore?.average}
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
                  <p className="text-small">{profesional.resume}</p>
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
                {profesional.email}
              </div>
            </Snippet>
            <Snippet symbol="" variant="shadow" color="success">
              <div className="flex flex-row gap-2 items-center">
                <IoIosCall />

                <span>{profesional.phone}</span>
              </div>
            </Snippet>
          </div>
        </CardFooter>
      </Card>
      <Card
        isBlurred
        className="relative max-lg:hidden h-full border-none p-3 bg-background/60 dark:bg-default-100/50 max-w-[610px] min-w-[290px] rounded lg:rounded-l-none"
        shadow="sm"
      >
        <Image
          removeWrapper
          alt={profesional.name}
          className="h-full w-full object-cover"
          shadow="sm"
          width={300}
          height={300}
          src="/servicio-ubicacion-profesionales.png"
        />
      </Card>
    </div>
  );
};

export default ServicioProfesionalCard;
