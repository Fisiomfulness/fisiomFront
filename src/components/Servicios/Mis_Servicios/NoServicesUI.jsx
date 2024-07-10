import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const NoServicesUI = () => {
  return (
    <div className="bg-primary-300 block w-full">
      <p className='w-full'>Todavía no publicaste ningún servicio 😥</p>
      <Button as={Link} color="primary" href="/servicios/crear">
        Empezar ya!
      </Button>
    </div>
  );
};

export default NoServicesUI;
