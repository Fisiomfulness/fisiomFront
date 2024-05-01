// @ts-check
import { useAtomValue, useSetAtom } from "jotai";
import {
  addItemAtom,
  cartAtom,
  clearCartAtom,
  quantityAtom,
  removeItemAtom,
  totalAtom,
  updateItemAtom,
} from "../store";

export function useCart() {
  const products = useAtomValue(cartAtom);
  const total = useAtomValue(totalAtom);
  const quantity = useAtomValue(quantityAtom);

  const addItem = useSetAtom(addItemAtom);
  const updateItem = useSetAtom(updateItemAtom);
  const removeItem = useSetAtom(removeItemAtom);
  const clearCart = useSetAtom(clearCartAtom);

  return {
    products,
    total,
    quantity,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
}
