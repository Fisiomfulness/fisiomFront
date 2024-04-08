"use client";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";

const ServicioAsideBar = () => {
  const path = usePathname();
  const matricula = path.match(/[0-9-]/g).join("");
  
  
 

  const buttons = [
    { name: "Perfil profesional", href: `/servicios/detalle${matricula}/perfil`,color:"secondary" ,className: "text-white rounded-l-lg lg:rounded-t-lg lg:rounded-l-none hover:text-white" },
    { name: "precios", href: `/servicios/detalle${matricula}/precios`, color: "secondary", className:"hover:text-white" },
    { name: "experiencia", href: `/servicios/detalle${matricula}/experiencia`, color: "secondary",  className:"hover:text-white"},
    { name: "turno", href: `/servicios/detalle${matricula}/turno`, className: "rounded-r-lg   lg:rounded-r-none lg:rounded-b-lg hover:text-white", color: "secondary" },
  ];

  return (
    <aside className="flex justify-center m-2">
      <div className="flex flex-row lg:flex-col">
        {buttons.map((button, index) => (
          <Button
            key={index}
            name={button.name}
            as={NextLink}
            href={button.href}
            color={path === button.href ? "primary" : button.color}
            radius="none"
            className={button.className}
          >
            {button.name}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default ServicioAsideBar;
