'use client';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import img from '../../../public/prodPrueba4.png';

export const ProductCard = ({ prod }) => {
  const router = useRouter();

  const handleOnClick = (id) => {
    router.push(`/productos/${id}`);
  };

  return (
    <Card isFooterBlurred className="flex w-full h-[299px] rounded-sm ">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Nuevo</p>
        <h4
          onClick={() => handleOnClick(prod._id)}
          className="text-white font-medium text-2xl cursor-pointer"
        >
          {prod.name}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt={`${prod.name} picture`}
        className="z-0 w-full h-full scale-105 -translate-y-6"
        src={prod.image}
      />
      <CardFooter className="absolute bg-black/30 -bottom-2 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <span className="text-white text-base">
            Disponible por ${prod.price}
          </span>
        </div>
        <Button
          className="text-tiny hover:bg-secondary"
          color="primary"
          radius="sm"
          size="sm"
          onClick={() => handleOnClick(prod._id)}
        >
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
