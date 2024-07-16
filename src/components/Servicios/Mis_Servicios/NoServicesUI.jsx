import { Button } from '@nextui-org/react';
import Link from 'next/link';

const NoServicesUI = () => {
  return (
    <div className="w-full px-auto center flex-col text-center bg-primary-50 size-[80%]">
      <p className="w-full mb-2 text-2xl text-secondary-500 font-bold">
        Todavía no publicaste ningún servicio 😥
      </p>
      <span className="text-sm text-secondary-500 font-semibold mb-5 opacity-70">
        ¡Recuerda que es la mejor manera de atraer a posibles clientes!
      </span>
      <Button
        as={Link}
        href="/servicios/crear"
        color="primary"
        size="lg"
        className="w-fit font-semibold"
      >
        Empezar ya!
      </Button>
    </div>
  );
};

export default NoServicesUI;
