import { container } from "@/styled-system/patterns";

export default function About() {
  return (
    <div className="flex flex-col justify-between !p-0">
      <img src="/border.svg" alt="border_top" className="max-h-40 mr-auto" />
      <div
        className={container({
          paddingX: { base: "10", md: "12", lg: "14" },
        })}
      >
        <h2 className="py-4">
          Quiénes <span className="text-primary">somos</span>
        </h2>
        <div className="flex flex-col gap-4 text-justify">
          <p>
            En FisiomFulness, somos mucho más que una startup en el mundo de la
            salud. Nuestro enfoque va más allá de los límites tradicionales de
            la atención médica, abrazando la salud física, mental y nutricional
            como pilares fundamentales para una vida plena y saludable.
          </p>
          <p>
            Creemos que la salud no es un lujo, sino un derecho fundamental de
            cada ser humano. Y es por eso que hemos decidido desafiar el statu
            del sistema de salud, hemos dado un paso valiente. Mientras los
            profesionales de la salud a menudo reciben un porcentaje mínimo de
            ganancia, en FisiomFulness, tendrán la oportunidad de obtener
            mejores ingresos. Porque entendemos que, para cambiar el mundo,
            primero debemos recompensar y empoderar a aquellos que trabajan
            incansablemente para mejorar nuestras vidas.
          </p>
          <p>
            Cada persona que se cruza con FisiomFulness es más que un cliente o
            un profesional de la salud; son parte de nuestra familia. Cuando
            usted confía en nosotros, confía en una comunidad apasionada que lo
            apoya en su búsqueda de bienestar. Nos esforzamos por crear un
            ambiente de apoyo, empatía y comprensión, donde usted se sienta
            seguro para embarcarse en su viaje hacia la salud física, mental y
            nutricional.
          </p>
          <p>
            En FisiomFulness, el bienestar es un viaje que emprendemos juntos.
            No importa cuál sea su punto de partida, estamos comprometidos a
            ayudarle a alcanzar sus metas y a vivir la vida al máximo. Creemos
            que el bienestar no es un destino, sino un camino continuo, y
            estamos aquí para guiarle en cada paso del camino. Así que, únase a
            nosotros en este viaje hacia una vida más saludable y significativa.
          </p>
        </div>
        <p className="text-center py-10">
          ¡Bienvenidos a FisiomFulness, donde el bienestar es nuestro compromiso
          y su satisfacción es nuestro éxito!
        </p>
        <img
          src="/logo_simple.webp"
          alt="logo_simple"
          width={60}
          className="mx-auto"
        />
      </div>
      <img
        src="/border.svg"
        alt="border_down"
        className="rotate-180 max-h-40 ml-auto"
      />
    </div>
  );
}
