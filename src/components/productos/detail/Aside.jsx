import MetodosDePago from "./MetodosDePago";
import ProdRelacionados from "./ProdRelacionados";
import data from "@/components/productos/data/productos.json";

const Aside = async ({ prod }) => {
  const prods = await data.productos.filter(
    (e) => e.categoria === prod.categoria
  );

  return (
    <aside className=" min-h-full xl:w-[30%]">
      <div className="flex flex-col mt-10 mb-10 gap-10">
        <MetodosDePago />
        <ProdRelacionados prods={prods} />
      </div>
    </aside>
  );
};

export default Aside;
