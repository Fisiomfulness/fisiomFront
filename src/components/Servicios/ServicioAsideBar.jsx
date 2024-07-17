'use client';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';
import NextLink from 'next/link';

const ServicioAsideBar = () => {
  const path = usePathname();
  const id = path.split('/')[2];

  const buttons = [
    {
      name: 'Perfil profesional',
      href: `/servicios/${id}/perfil`,
      color: 'secondary',
      className:
        'text-white lg:rounded-l-lg lg:rounded-t-lg lg:rounded-l-none hover:text-white',
    },
    {
      name: 'precios',
      href: `/servicios/${id}/precios`,
      color: 'secondary',
      className: 'hover:text-white lg:rounded-md',
    },
    {
      name: 'experiencia',
      href: `/servicios/${id}/experiencia`,
      color: 'secondary',
      className: 'hover:text-white lg:rounded-md',
    },
    {
      name: 'turno',
      href: `/servicios/${id}/turno`,
      className:
        'lg:rounded-r-lg lg:rounded-r-none lg:rounded-b-lg hover:text-white',
      color: 'secondary',
    },
  ];

  return (
    <aside className="mt-2 grid rounded-md overflow-hidden grid-cols-2 grid-rows-2 lg:vstack lg:gap-4 lg:justify-start">
      {buttons.map((button, index) => (
        <Button
          key={index}
          name={button.name}
          as={NextLink}
          href={button.href}
          color={path === button.href ? 'primary' : button.color}
          radius="none"
          className={`font-semibold capitalize py-4 md:py-6 ${button.className}`}
        >
          {button.name}
        </Button>
      ))}
    </aside>
  );
};

export default ServicioAsideBar;
