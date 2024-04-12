import ProductDetailPageClient from "./page.client";

const ProductDetailPage = ({ params }) => {
  const { productoId } = params;

  return <ProductDetailPageClient productId={productoId} />;
};

export default ProductDetailPage;
