import data from "@/components/productos/data/productos.json";
import ProductClient from "@/components/productos/ProductClient";

const ProductosPage = async () => {
  return (
    <>
      <ProductClient data={data.productos} />
    </>
  );
};

export default ProductosPage;
