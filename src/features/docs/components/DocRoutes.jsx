"use server";

import Link from "next/link";

import fs from "fs";
import path from "path";

const directoryPath = path.join(__dirname, "../../../../src/app/");
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((file) => file.isDirectory() && file.name !== "only_development")
    .map((file) => file.name);
const routes = getDirectories(directoryPath);

export default async function DocRoutes() {
  return (
    <div>
      <p className="text-lg font-bold underline">Rutas</p>
      <div
        className={[
          "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
          "overflow-hidden w-full",
        ].join(" ")}
      >
        {routes.map((route) => (
          <Link
            key={route}
            href={route}
            className={[
              "border-l-2 border-primary",
              "whitespace-nowrap hover:font-bold px-1.5 leading-snug",
            ].join(" ")}
          >
            Ir a /{route}
          </Link>
        ))}
      </div>
    </div>
  );
}
