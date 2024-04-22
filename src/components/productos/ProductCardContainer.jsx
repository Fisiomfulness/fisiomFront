import { ProductCard } from "./ProductCard";

const ProductCardContainer = ({ productos }) => {
  return (
    <>
      {productos.length ? (
        <div className="w-full justify-items-center gap-6 px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productos?.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-4">
          <h2 className="text-center">No hemos encontrado resultados.</h2>
        </div>
      )}
    </>
  );
};

export default ProductCardContainer;
