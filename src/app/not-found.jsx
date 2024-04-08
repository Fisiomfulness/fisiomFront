import { center } from "@/styled-system/patterns";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className={center({
        flexDir: "column",
        gap: "1",
        minH: "92vh",
        textAlign: "center",
        margin: "0",
        width: "100vw",
        maxW: "unset!",
      })}
    >
      <img
        className="absolute bottom-0 left-0 h-[42%] max-sm:w-1/2 max-sm:h-auto"
        alt="logo_overlay"
        src="/logo_overlay.webp"
      />
      <div className="mb-6 flex flex-row justify-center">
        <p className="text-8xl text-primary font-bold">
          4<span className="text-primary-500">0</span>4
        </p>

        <img
          className="self-start"
          width={50}
          src="/parche.webp"
          alt="Error 404"
        />
      </div>

      <p>
        Es posible que la entrada haya sido eliminada o que la dirección no
        exista.
      </p>
      <p className="mb-16">
        En 5 segundos serás redirigido/a a nuestra página principal o puedes
        hacer{" "}
        <Link href="/" className="text-primary cursor-pointer underline">
          click aquí
        </Link>
        .
      </p>
    </div>
  );
}
