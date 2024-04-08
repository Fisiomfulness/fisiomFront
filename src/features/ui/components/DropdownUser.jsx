"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

const items = [
  { key: "mis_compras", label: "Mis compras" },
  { key: "mis_mensajes", label: "Mis mensajes" },
  { key: "mis_citas", label: "Mis citas" },
  { key: "editar_perfil", label: "Editar perfil" },
  { key: "cerrar_sesion", label: "Cerrar sesion" },
];

export default function DropdownUser() {
  const [state, setState] = useState(false);

  return (
    <Dropdown
      offset={0}
      disableAnimation
      classNames={{
        content: twMerge(
          "bg-white w-[260px] text-center p-0",
          "shadow-none rounded-t-none",
          "border-1 border-zinc-300",
          state && "border-t-0 rounded-t-none",
        ),
      }}
      onOpenChange={(isOpen) => setState(isOpen)}
    >
      <DropdownTrigger className="text-base">
        <Button
          variant="bordered"
          className={twMerge(
            "h-auto px-4 py-2 w-[260px]",
            "flex flex-row gap-4",
            "!opacity-100 !transform-none",
            state && "border-1 border-b-0 rounded-b-none",
          )}
        >
          <p className="truncate w-3/4">Maria Perez Gutierrez</p>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={items}
        itemClasses={{
          base: "hover:!bg-primary-500/50",
          title: "text-base",
        }}
      >
        {(item) => (
          <DropdownItem key={item.key} href={item.key}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
