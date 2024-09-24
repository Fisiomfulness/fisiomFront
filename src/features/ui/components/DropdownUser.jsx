// @ts-check
"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
const items = [
  { key: "/user/editar_perfil", label: "Editar perfil" },
  {
    key: "root_mis_servicios",
    label: "Administrar Cuenta",
    root: true,
    children: [
      { key: "/user/suspend_account", label: "Suspender Cuenta" },
      { key: "/user/delete_account", label: "Eliminar Cuenta" },
    ],
  },
  { key: "/user/agenda", label: "Mis Citas" },
  {
    key: "root_mis_servicios",
    label: "Mis servicios",
    root: true,
    children: [
      { key: "/user/mis_servicios", label: "Servicios" },
      { key: "/user/pacientes", label: "Pacientes" },
      { key: "/user/calendario", label: "Calendario" },
    ],
  },
  { key: "/user/carrito", label: "Carrito" },
  { key: "/dashboard", label: "Dashboard" },
  { key: "/user/mis_productos", label: "Mis productos" },
  { key: "/user/mis_compras", label: "Mis compras" },
  { key: "/user/mis_mensajes", label: "Mis mensajes" },
  {
    key: "root_blog",
    label: "Blog",
    root: true,
    children: [
      { key: "/blog/crear", label: "Crear blog" },
      { key: "/blog/mis-blogs", label: "Mis blogs" },
    ],
  },
];

/** @param {{ name: string, image: string }} props */
export default function DropdownUser({ name, image }) {
  const [isOpened, setIsOpened] = useState(false);

  const { data: session } = useSession();
  const role = session?.user?.role ?? "";

  const manageModal = () => {
    setTimeout(() => {
      setIsOpened(!isOpened);
    }, 500);
  };
  return (
    <Dropdown
      disableAnimation
      classNames={{
        content: "text-center p-0 rounded-lg min-w-44",
      }}
      closeOnSelect={false}
      isOpen={isOpened}
    >
      <DropdownTrigger>
        <User
          as="button"
          name={name}
          onClick={manageModal}
          avatarProps={{
            src: image,
          }}
          className="flex-row-reverse !transform-none !opacity-100 gap-4"
        />
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Static Actions"
        itemClasses={{
          base: "hover:!bg-primary-500/50",
        }}
      >
        <DropdownSection
          className="!m-0"
          showDivider
          dividerProps={{ className: "!m-1" }}
        >
          {items
            .filter(
              (item) =>
                !(
                  role === "user" &&
                  (item.label === "Blog" || item.label === "Mis servicios")
                )
            ) // Filtrar "Mis servicios" y "Blog" si el rol es "user"
            .filter(
              (item) =>
                !(
                  item.label === "Dashboard" &&
                  (role === "user" || role === "professional")
                )
            ) // mostrar "Dashboard" solo para el admin
            .map((item) =>
              item.root ? (
                <DropdownItem key={item.key} textValue={item.label}>
                  <Popover
                    radius="sm"
                    showArrow
                    shouldFlip
                    placement="left"
                    classNames={{ content: "!px-1" }}
                  >
                    <PopoverTrigger>
                      <div className="relative">
                        <FaChevronLeft className="absolute inset-0 my-auto" />
                        <span>{item.label}</span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      {item.children.map((child) => (
                        <Link
                          className={[
                            "min-w-44 text-center",
                            "py-1.5 hover:!bg-primary-500/50 rounded-md",
                          ].join(" ")}
                          key={child.key}
                          href={child.key}
                          onClick={manageModal}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </PopoverContent>
                  </Popover>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key={item.key}
                  closeOnSelect
                  as={Link}
                  href={item.key}
                  onClick={manageModal}
                >
                  {item.label}
                </DropdownItem>
              )
            )}
        </DropdownSection>

        <DropdownSection className="!m-0">
          <DropdownItem key="cerrar_sesion" onClick={() => signOut()}>
            Cerrar sesion
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
