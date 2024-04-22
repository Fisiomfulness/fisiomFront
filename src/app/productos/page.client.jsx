"use client";

import { useState, useEffect } from "react";
import { SearchProd } from "@/components/productos/SearchProd";
import ProductCardContainer from "@/components/productos/ProductCardContainer";
import Paginate from "@/components/Paginate/Paginate";
import { apiEndpoints } from "@/api_endpoints";
import axios from "axios";

const ProductosPageClient = () => {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    categoryId: "",
    name: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(apiEndpoints.products, {
        signal: abortController.signal,
        params: {
          categoryId: filter.categoryId,
          search: filter.name,
          page: page,
        },
      })
      .then(({ data }) => {
        setProductos(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        throw err;
      });
    return () => abortController.abort();
  }, [filter, page]);

  return (
    <main className="flex flex-col w-full items-center gap-6 mt-5 mb-16">
      <SearchProd filter={filter} setFilter={setFilter} setPage={setPage} />
      <ProductCardContainer productos={productos} />
      <Paginate page={page} total={totalPages} setPage={setPage} />
    </main>
  );
};

export default ProductosPageClient;
