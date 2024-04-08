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
    return (
      <main
        // NOTE: selectores de pandacss causan conflicto con tailwind.
        className={[
          // center
          "flex justify-center items-center",
          // container
          "[&>div]:relative [&>div]:mx-auto",
          "[&>div]:px-4 [&>div]:md:px-6 [&>div]:lg:px-8",
          // NOTE: disable max width
          // "[&>div]:max-w-[90rem]",
          // extras
          "min-h-screen",
          "[&>div]:min-h-screen [&>div]:flex-1 [&>div]:overflow-hidden",
        ].join(" ")}
      >
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main
        className={[
          // container
          "[&>div]:relative [&>div]:mx-auto",
          "[&>div]:px-4 [&>div]:md:px-6 [&>div]:lg:px-8",
          "[&>div]:max-w-[90rem]",
          // extras
          "flex min-h-[92vh] [&>div]:overflow-hidden",
        ].join(" ")}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
