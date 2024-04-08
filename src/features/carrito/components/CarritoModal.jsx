"use client";

import { CustomButton, CustomModal, CustomAlert } from "@/features/ui";
import { Badge, useDisclosure } from "@nextui-org/react";
import { useAtom } from "jotai";
import { MdShoppingCart } from "react-icons/md";
import { cartAtom } from "../store";
import { useCart } from "../hooks";

function ListProducts() {
  const [{ cart }, { removeItem }] = useCart();

  return (
    <div
      className={
        "flex flex-col gap-4 text-secondary my-8 h-80 overflow-auto px-6"
      }
    >
      {cart.map((product) => (
        <div key={product.key} className="flex flex-row gap-5">
          <img
            src={product.img}
            alt={product.name}
            className="min-w-[160px] h-24 object-cover object-bottom rounded-lg"
          />
          <div className="w-80">
            <p className="font-bold text-md">{product.name}</p>
            <p className="line-clamp-3">{product.description}</p>
          </div>
          <div className="text-right flex flex-col gap-2 justify-center">
            <p className="font-bold text-xl">${product.price}</p>
            <CustomButton
              color="danger"
              size="sm"
              className="px-2 py-1 lowercase"
              onPress={() => removeItem(product)}
            >
              eliminar
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CarritoModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [{ cart, quantity }] = useAtom(cartAtom);
  const [, { clearCart }] = useCart();

  return (
    <div className="h-10 overflow-hidden">
      <button onClick={onOpen} className="p-2 pb-0">
        <Badge content={quantity} color="danger" placement="top-left" size="md">
          <MdShoppingCart className="w-8 h-8 text-primary" />
        </Badge>
      </button>
      <CustomModal
        isOpen={isOpen && cart.length}
        onOpenChange={onOpenChange}
        className="max-w-3xl"
      >
        <p className="border-b border-primary w-fit text-lg font-semibold">
          Tu Carro
        </p>
        <div className="mx-auto max-w-fit">
          <ListProducts />
          <div className="w-64 flex flex-col gap-2 mx-auto">
            <CustomButton onPress={onOpenChange}>Checkout</CustomButton>
            <CustomButton color="danger" onPress={clearCart}>
              Borrar todo
            </CustomButton>
          </div>
        </div>
      </CustomModal>
      <CustomAlert
        isOpen={isOpen && !cart.length}
        onOpenChange={onOpenChange}
        status="info"
        onClose={onOpenChange}
        isDismissable
      >
        No tienes items en tu carro
      </CustomAlert>
    </div>
  );
}
