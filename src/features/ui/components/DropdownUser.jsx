// @ts-check
"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownSection,
} from "@nextui-org/react";
import { FaChevronLeft } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

const items = [
  { key: "/edit_profile", label: "Editar perfil" },
  {
    key: "root_mis_servicios",
    label: "Mis servicios",
    root: true,
    children: [
      { key: "/pacientes", label: "Pacientes" },
      { key: "/calendario", label: "Calendario" },
    ],
  },
  { key: "/mis_compras", label: "Mis compras" },
  { key: "/mis_mensajes", label: "Mis mensajes" },
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

export default function DropdownUser() {
  const { logout } = useUser();

  return (
    <Dropdown
      disableAnimation
      classNames={{
        content: "text-center p-0 rounded-lg min-w-44",
      }}
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <User
          as="button"
          name="Dr. Mario Gómez"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="flex-row-reverse !transform-none !opacity-100"
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
          {items.map((item) =>
            item.root ? (
              <DropdownItem key={item.key}>
                <Popover
                  radius="sm"
                  showArrow
                  shouldFlip
                  placement="left"
                  classNames={{ content: "!px-1"}}
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
                      >
                        {child.label}
                      </Link>
                    ))}
                  </PopoverContent>
                </Popover>
              </DropdownItem>
            ) : (
              <DropdownItem key={item.key} href={item.key} closeOnSelect>
                {item.label}
              </DropdownItem>
            ),
          )}
        </DropdownSection>
        <DropdownSection className="!m-0">
          <DropdownItem key="cerrar_sesion" onClick={logout}>
            Cerrar sesion
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
