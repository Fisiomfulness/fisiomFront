import Detail from "@/components/productos/detail/Detail";

const ProductDetail = ({ params }) => {
  const { productoId } = params;

  return <Detail productId={productoId} />;
};

export default ProductDetail;
