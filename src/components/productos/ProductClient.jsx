"use client";

import { useState } from "react";
import { SearchProd } from "./SearchProd";
import ProductCardContainer from "./ProductCardContainer";

const ProductClient = ({ data }) => {
  const [prodFiltrados, setProdFiltrados] = useState([...data]);

  return (
    <main className="flex flex-col w-full items-center gap-6 mt-5 mb-16">
      <SearchProd prods={data} setProdFiltrados={setProdFiltrados} />
      <ProductCardContainer prods={prodFiltrados} />
    </main>
  );
};

export default ProductClient;
