"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/react";
import LoginDropDown from "./LoginDropDown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CustomButton } from "@/features/ui";
import { css } from "@/styled-system/css";

const menuItems = [
  { name: "Servicios", href: "/servicios" },
  { name: "Pregunta a un experto", href: "/pregunta_experto" },
  { name: "Comunidad", href: "/comunidad" },
  // { name: "Tratamientos", href: "/tratamientos" },
  { name: "Trabaja Con Nosotros", href: "/trabajaConNosotros" },
  { name: "Blog", href: "/blog" },
  { name: "Productos", href: "/productos" },
];

function NavbarLink({ item, onClick }) {
  return (
    <Link
      className="block w-full hover:text-primary hover:font-bold"
      href={item.href}
      onClick={onClick}
    >
      {item.name}
    </Link>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  const path = usePathname();

  return (
    <Navbar
      height="75px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: css({
          maxW: "8xl!",
          position: "relative!",
          paddingX: { base: "4!", md: "6!", lg: "8!" },
          gap: "6!",
        }),
        item: [
          "data-[active=true]:text-primary",
          "data-[active=true]:font-bold",
        ],
        menuItem: [
          "data-[active=true]:text-primary",
          "data-[active=true]:font-bold",
        ],
        toggle: "mr-2",
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <img
              src="/logo_minimal.webp"
              width={200}
              alt="logo_minimal"
              className="lg:hidden"
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            />
            <img
              src="/logo_simple.webp"
              width={48}
              alt="logo_simple"
              className="hidden lg:block"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={path === item.href}>
            <NavbarLink item={item} />
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="max-lg:!flex-grow-0">
        <NavbarItem>
          {isLogged ? (
            <LoginDropDown />
          ) : (
            <CustomButton onClick={setIsLogged} as={Link} href="/login">
              Login
            </CustomButton>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name} isActive={path === item.href}>
            <NavbarLink item={item} onClick={() => setIsMenuOpen(false)} />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
