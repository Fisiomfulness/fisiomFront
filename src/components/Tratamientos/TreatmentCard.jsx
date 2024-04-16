import { Link } from "@nextui-org/link";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const TreatmentCard = ({ treat }) => {
  return (
    <Card isFooterBlurred radius="sm" className="h-64">
      <Image
        removeWrapper
        alt="Treatments available"
        src={treat.imagen}
        className="h-full object-cover"
      />
      <CardFooter
        className="bg-[#ACD9EC] bg-opacity-75 py-6 absolute bottom-0 z-10"
        as={Link}
        href="#"
      >
        <p className="text-2xl font-bold text-primary-700">
          {treat.serviceName}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TreatmentCard;
