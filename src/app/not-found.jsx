import Link from 'next/link';

export const metadata = {
  title: 'Pagina no encontrada',
};

export default function NotFound() {
  return (
    <main className="relative center flex-col gap-1 min-h-[92vh] text-center w-screen !max-w-[unset]">
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
        hacer{' '}
        <Link href="/" className="text-primary cursor-pointer underline">
          click aquí
        </Link>
        .
      </p>
    </main>
  );
}
