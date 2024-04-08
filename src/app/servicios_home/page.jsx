import { grid } from "@/styled-system/patterns";
import Link from "next/link";

const links = [
  {
    name: "Salud Mental",
    className: "bg-[url('/servicios_img/salud_mental.webp')]",
  },
  {
    name: "Salud Física",
    className: "bg-[url('/servicios_img/salud_fisica.webp')]",
  },
  {
    name: "Salud Nutricional",
    className: "bg-[url('/servicios_img/salud_nutricional.webp')]",
  },
];

export default function ServiciosHomePage() {
  return (
    <div
      className={grid({
        gridTemplateRows: { base: "3", md: "1" },
        gridTemplateColumns: { md: "3" },
        gap: "0",
        padding: "0!",
      })}
    >
      {links.map((item) => (
        <Link
          key={item.name}
          className={`${item.className} bg-center bg-no-repeat bg-cover`}
          href={"#"}
        >
          <div
            className={[
              "h-full text-white grid place-content-center",
              "bg-primary/40 font-bold italic text-center",
              "hover:bg-primary/20",
            ].join(" ")}
          >
            <p className="text-3xl">{item.name.split(" ")[0]}</p>
            <p className="text-5xl">{item.name.split(" ")[1]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
