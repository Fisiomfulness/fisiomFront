import { useAtomValue, useSetAtom } from "jotai";
import { addItemAtom, cartAtom, clearCartAtom, removeItemAtom } from "../store";
import { useMemo } from "react";

export function useCart() {
  const _state = useAtomValue(cartAtom);

  const removeItem = useSetAtom(removeItemAtom);
  const addItem = useSetAtom(addItemAtom);
  const clearCart = useSetAtom(clearCartAtom);

  const state = useMemo(() => _state, [_state]);

  const actions = useMemo(
    () => ({
      removeItem,
      addItem,
      clearCart,
    }),
    [removeItem, addItem, clearCart],
  );

  return [state, actions];
}
