"use client";

import { useState, useEffect } from "react";
import { SearchProd } from "./SearchProd";
import ProductCardContainer from "./ProductCardContainer";
import { apiEndpoints } from "@/api_endpoints";

const ProductClient = () => {
  const [productos, setProductos] = useState([]);
  const [prodFiltrados, setProdFiltrados] = useState([]);
  useEffect(() => {
    fetch(apiEndpoints.products, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      setProductos([...data.products]);
      setProdFiltrados([...data.products]);
    })
  },[])

  return (
    <main className="flex flex-col w-full items-center gap-6 mt-5 mb-16">
      <SearchProd prods={productos} setProdFiltrados={setProdFiltrados} />
      <ProductCardContainer prods={prodFiltrados} />
    </main>
  );
};

export default ProductClient;
