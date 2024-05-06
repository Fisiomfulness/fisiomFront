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

const ServicioMainCardSmall = ({ profesional }) => {
  return (
    <div className="flex flex-col ">
      <Card className="border-none bg-background/60 w-full dark:bg-default-100/50  rounded-r-none lg:rounded">
        <CardBody>
          <div className="flex flex-col">
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
                      rating={profesional.averageScore.average}
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
                  href={`./servicios/${profesional._id}/perfil`}
                >
                  Ver mas
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServicioMainCardSmall;
