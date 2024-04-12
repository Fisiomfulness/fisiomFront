"use client";
import { useRouter } from "next/navigation";

const ProdRelacionados = ({ prods }) => {
  const router = useRouter();

  return (
    <div className="bg-[#A1D3EDB2] flex flex-col w-fit items-center gap-4 p-5 rounded-sm">
      <span className="text-[#003953] font-bold">Productos relacionados</span>
      {prods?.slice(0, 5).map((prod) => {
        return (
          <div
            onClick={() => router.push(`/productos/${prod._id}`)}
            key={prod._id}
            className="flex gap-2 border border-white cursor-pointer rounded-sm hover:border-[#003953]  duration-300"
          >
            <div className="flex flex-col justify-between w-[150px] p-2">
              <span className="text-[#003953] font-bold">{prod.name}</span>
              <strong>${prod.price}</strong>
            </div>
            <div
              className="w-[100px] h-[90px] bg-cover bg-center"
              style={{ backgroundImage: `url(${prod.image})` }}
            ></div>
          </div>
        );
      })}

      <span
        className="cursor-pointer text-xs text-[#003953] border-[#003953] border-b-1 font-semibold transition-all duration-250 hover:scale-105"
        onClick={() => router.push("/productos")}
      >
        Ver todos los productos
      </span>
    </div>
  );
};

export default ProdRelacionados;
