import { ProductCard } from './ProductCard';

const ProductCardContainer = ({ productos }) => {
  return (
    <>
      {productos.length ? (
        <div className="w-full gap-6 items-center justify-center grid grid-cols-[repeat(auto-fill,minmax(auto,250px))]">
          {productos?.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}
        </div>
      ) : (
        <div className="grow flex items-center justify-center">
          <h2 className="text-center size-fit">
            No hemos encontrado resultados.
          </h2>
        </div>
      )}
    </>
  );
};

export default ProductCardContainer;
