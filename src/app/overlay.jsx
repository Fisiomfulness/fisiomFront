"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

const exclude = [
  "/login",
  "/servicios_home",
  "/recupero",
  "/registro",
  "/about",
];
export function Overlay({ children }) {
  const pathname = usePathname();

  if (exclude.includes(pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
