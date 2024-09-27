// @ts-check
"use client";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import { useState, useEffect } from "react";
import { CustomButton, CustomModal, CustomAlert } from "@/features/ui";
import { Badge, useDisclosure } from "@nextui-org/react";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "../hooks";

/**
 * @typedef {import("../store/cart").Product} Product
 */

/** @param {number} value */
function parseCurrency(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  })
    .format(value)
    .replace(/\s/g, "");
}

/**
 * @typedef {ReturnType<typeof useDisclosure>} UseDisclosure
 * @param {{
 *   isOpen: UseDisclosure["isOpen"],
 *   onOpenChange: UseDisclosure["onOpenChange"]
 * }} props
 */
function ListProducts({ isOpen, onOpenChange }) {
  const { products, removeItem, updateItem, total, clearCart } = useCart();

  /**
   * @param {string} id
   * @param {Product} item
   */
  function handleUpdateCart(id, item) {
    if (!item.quantity) {
      removeItem(id);
      return;
    }

    updateItem(id, item);
  }

  const [html, setHtml] = useState("");

  // Handle script injection and HTML rendering
  useEffect(() => {
    if (html) {
      const container = document.createElement("div");
      container.innerHTML = html;

      // Inject HTML content
      document.body.appendChild(container);

      const scripts = Array.from(container.getElementsByTagName("script"));
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

      // Clean up appended elements on unmount
      return () => {
        container.remove();
      };
    }
  }, [html]);

  async function handleCheckout() {
    // Send POST request to backend to make purchase
    const payload = { total, productsMap: Object.fromEntries(products) };
    const { data } = await axios.post(`${BASE_URL}/purchases/init`, payload, {
      withCredentials: true,
      responseType: "text",
    });

    setHtml(data); // Set the new HTML from the response
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-w-3xl"
    >
      <p className="border-b border-primary w-fit text-lg font-semibold">
        Tu Carrito - <span className="font-mono">{parseCurrency(total)}</span>
      </p>
      <div className="mx-auto max-w-fit">
        <div className="space-y-4 text-secondary my-6 h-80 overflow-auto px-6">
          {Array.from(products, ([key, product]) => (
            <div key={key} className="flex flex-row gap-5">
              <img
                src={product.image}
                alt={product.name}
                className="min-w-[160px] h-24 object-cover object-bottom rounded-lg"
              />
              <div className="w-80">
                <p className="font-bold text-md">{product.name}</p>
                <p className="line-clamp-3">{product.description}</p>
              </div>
              <div className="text-right flex flex-col gap-2 justify-center">
                <p className="font-semibold text-xl font-mono">
                  {parseCurrency(product.price)}
                </p>
                <CustomButton
                  color="danger"
                  size="sm"
                  className="px-2 py-1"
                  onPress={() => {
                    handleUpdateCart(key, {
                      ...product,
                      quantity: product.quantity - 1,
                    });
                  }}
                >
                  eliminar
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
        <div className="w-64 flex flex-col gap-2 mx-auto">
          <CustomButton onPress={handleCheckout}>Checkout</CustomButton>
          <CustomButton color="danger" onPress={clearCart}>
            Borrar todo
          </CustomButton>
        </div>
      </div>
      {html && (
        <div>
          <p>{html}</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </CustomModal>
  );
}

export default function CarritoModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { quantity } = useCart();

  return (
    <>
      <button onClick={onOpen} className="p-2 pb-0 block">
        <Badge
          content={quantity}
          color="danger"
          placement="top-left"
          size="md"
          classNames={{ base: "block" }}
        >
          <MdShoppingCart className="w-8 h-8 text-primary" />
        </Badge>
      </button>
      <ListProducts
        isOpen={isOpen && Boolean(quantity)}
        onOpenChange={onOpenChange}
      />
      <CustomAlert
        isOpen={isOpen && !quantity}
        onOpenChange={onOpenChange}
        status="info"
        onClose={onOpenChange}
        isDismissable
      >
        No tienes items en tu carro
      </CustomAlert>
    </>
  );
}
