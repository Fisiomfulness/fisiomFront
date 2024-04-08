import { atom } from "jotai";

const products = new Array(4).fill().map((_, index) => ({
  key: index + 1,
  name: `Producto ${index + 1}`,
  price: 100,
  description: `
    Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
    labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
    Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum
    Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
    Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
    occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat
    officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in
    Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non
    excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut
    ea consectetur et est culpa et culpa duis.
  `,
  img: "/prod1Prueba.png",
  quantity: 1,
}));

// TODO: Implementar total y quantity
export const cartAtom = atom({
  cart: products,
  total: products.length * 100,
  quantity: products.length,
});

export const removeItemAtom = atom(null, (get, set, item) => {
  const { cart } = get(cartAtom);
  const isInCart = cart.some((cartItem) => cartItem.key === item.key);

  if (!isInCart) {
    const draft = cart.concat({ ...item, quantity: 1 });
    set(cartAtom, (prev) => ({
      ...prev,
      cart: draft,
    }));
    return;
  }

  const draft = cart.reduce((acc, cartItem) => {
    if (item.key !== cartItem.key) {
      return acc.concat(cartItem);
    } else {
      if (cartItem.quantity === 1) {
        set(cartAtom, (prev) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
        return acc;
      }
      return acc.concat({ ...item, quantity: item.quantity - 1 });
    }
  }, []);

  set(cartAtom, (prev) => ({
    ...prev,
    cart: draft,
  }));
});

export const addItemAtom = atom(null, (get, set, item) => {
  const { cart } = get(cartAtom);
  const isInCart = cart.some((cartItem) => cartItem.key === item.key);

  if (!isInCart) {
    const draft = cart.concat({ ...item, quantity: 1 });
    set(cartAtom, (prev) => ({
      ...prev,
      cart: draft,
    }));
    return;
  }

  const draft = cart.reduce((acc, cartItem) => {
    if (item.key !== cartItem.key) {
      return acc.concat(cartItem);
    } else {
      return acc.concat({ ...item, quantity: item.quantity + 1 });
    }
  }, []);

  set(cartAtom, (prev) => ({
    ...prev,
    cart: draft,
  }));
});

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, (prev) => ({
    ...prev,
    cart: [],
  }));
});
