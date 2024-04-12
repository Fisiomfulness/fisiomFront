"use client";

import { useState, useEffect } from "react";
import { SearchProd } from "@/components/productos/SearchProd";
import ProductCardContainer from "@/components/productos/ProductCardContainer";
import { apiEndpoints } from "@/api_endpoints";

const ProductosPageClient = () => {
  const [productos, setProductos] = useState([]);
  const [prodFiltrados, setProdFiltrados] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(apiEndpoints.products, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.products);
        setProdFiltrados(data.products);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        throw err;
      });

    return () => abortController.abort();
  }, []);

  return (
    <main className="flex flex-col w-full items-center gap-6 mt-5 mb-16">
      <SearchProd prods={productos} setProdFiltrados={setProdFiltrados} />
      <ProductCardContainer prods={prodFiltrados} />
    </main>
  );
};

export default ProductosPageClient;
