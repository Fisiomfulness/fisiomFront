"use client";

import { useEffect, useState } from "react";
import { apiEndpoints } from "@/api_endpoints";
import DetailClient from "@/components/productos/detail/DetailClient";
import Aside from "@/components/productos/detail/Aside";

const ProductDetailPageClient = ({ productId }) => {
  const [prod, setProd] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    fetch(apiEndpoints.productsDetail + productId, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProd(data.product);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        throw err;
      });

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className={[
        "px-auto flex flex-col w-full items-center",
        "sm:justify-between sm:flex-row sm:items-start",
      ].join(" ")}
    >
      <DetailClient prod={prod} />
      <Aside prod={prod} />
    </main>
  );
};

export default ProductDetailPageClient;
