"use client";
import { useRouter } from "next/navigation";
import img from "../../../../public/prodPrueba4.png";

const ProdRelacionados = ({ prods }) => {
  const router = useRouter();

  return (
    <div className="bg-[#A1D3EDB2] flex flex-col w-fit items-center gap-4 p-5 rounded-sm">
      <span className="text-[#003953] font-bold">Productos relacionados</span>
      {prods?.slice(0, 5).map((e) => {
        return (
          <div
            onClick={() => router.push(`/productos/${e.id}`)}
            key={e.id}
            className="flex gap-2 border border-white cursor-pointer rounded-sm hover:border-[#003953]  duration-300"
          >
            <div className="flex flex-col justify-between w-[150px] p-2">
              <span className="text-[#003953] font-bold">{e.nombre}</span>
              <span className="text-xs">{e.categoria}</span>
              <strong>${e.precio}</strong>
            </div>
            <div
              className="w-[100px] h-[90px] bg-cover bg-center"
              style={{ backgroundImage: `url(${img.src})` }}
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
