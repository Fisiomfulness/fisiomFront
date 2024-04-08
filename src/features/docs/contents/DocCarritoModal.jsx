import { CarritoModal } from "@/features/carrito";
import { DocTabs } from "../components";

export default function DocCarrito() {
  return (
    <>
      <p className="text-lg font-bold">Carrito Modal</p>
      <div>
        <p>No acepta ninguna prop ni referencia.</p>
        <p>Muestra y elimina los productos que hay en el carrito.</p>
      </div>
      <DocTabs
        previewRender={<CarritoModal />}
        codeRender={`<CarritoModal />`}
      />
    </>
  );
}
