// @ts-check
import { atom } from "jotai";

/**
 * @typedef {{
 *   id: string;
 *   name: string;
 *   description: string;
 *   price: number;
 *   image: string;
 *   quantity: number;
 * }} Product
 */

/** @param {number} max */
function getRandomInt(max) {
  let randomNum = Math.random() * max;
  // Redondear al primer decimal
  randomNum = Math.round(randomNum * 10) / 10;
  // Asegurarse de que no sea menor de 10
  randomNum = Math.max(10, randomNum);
  return randomNum;
}

/** @type {Product[]} */
const products = new Array(10).fill(null).map((_, index) => ({
  id: crypto.randomUUID(),
  name: `Producto ${index + 1}`,
  price: getRandomInt(50),
  description: `Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.`,
  image: "/prod1Prueba.png",
  quantity: 1,
}));

export const cartAtom = atom(
  new Map(products.map((product) => [product.id, product])),
);

export const totalAtom = atom((get) =>
  Array.from(get(cartAtom).values()).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  ),
);
export const quantityAtom = atom((get) =>
  Array.from(get(cartAtom).values()).reduce(
    (acc, item) => acc + item.quantity,
    0,
  ),
);

// NOTE: Usa la misma logica que `updateItemAtom`
export const addItemAtom = atom(
  null,
  /**
   * @param {string} id
   * @param {Product} value
   */
  (get, set, id, value) => {
    const products = get(cartAtom);

    // NOTE: Tal vez se deba establecer el `id` automaticamente
    products.set(id, value);

    set(cartAtom, new Map(products));
  },
);

export const updateItemAtom = atom(
  null,
  /**
   * @param {string} id
   * @param {Product} value
   */
  (get, set, id, value) => {
    const products = get(cartAtom);

    products.set(id, value);

    set(cartAtom, new Map(products));
  },
);

export const removeItemAtom = atom(
  null,
  /** @param {string} id */
  (get, set, id) => {
    const products = get(cartAtom);

    products.delete(id);

    set(cartAtom, new Map(products));
  },
);

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, new Map());
});
