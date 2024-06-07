// @ts-check

/**
 * @typedef {{
 *   id: number;
 *   type: "bot" | "user";
 *   text: any;
 * }} Message
 *
 * @type {Message[]}
 */
export const messages = [
  {
    id: 1,
    type: "bot",
    text: "Mensaje al usuario",
  },
  {
    id: 2,
    type: "user",
    text: "Respuesta del usuario",
  },
  {
    id: 3,
    type: "user",
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 4,
    type: "bot",
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 5,
    type: "user",
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 6,
    type: "bot",
    text:
      "Inyeccion de codigo: " +
      (
        <>
          <span
            className="cursor-pointer font-extrabold animate-pulse"
            onClick={() => alert("This is a ReactNode (╯°□°）╯︵ ┻━┻")}
          >
            This is a ReactNode
          </span>{" "}
          <span>(╯°□°）╯︵ ┻━┻</span>
        </>
      ),
  },
  {
    id: 7,
    type: "user",
    text: "Este es un chat de prueba",
  },
  {
    id: 8,
    type: "bot",
    text: "Este es un chat de prueba",
  },
];
