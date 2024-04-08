import Detail from "@/components/productos/detail/Detail";
import data from "@/components/productos/data/productos.json";

const ProductDetail = async ({ params }) => {
  const producto = await data.productos.find((e) => e.id === params.productoId);

  return <Detail prod={producto} />;
};

export default ProductDetail;
