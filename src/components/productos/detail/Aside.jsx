"use client";
import { useEffect, useState } from "react";
import MetodosDePago from "./MetodosDePago";
import ProdRelacionados from "./ProdRelacionados";
import { apiEndpoints } from "@/api_endpoints";

const Aside = ({ prod }) => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(apiEndpoints.products, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setProds(
          data.products.filter(
            (product) =>
              product.category._id === prod.category?._id &&
              product._id !== prod?._id
          )
        );
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        throw err;
      });

    return () => abortController.abort();
  }, [prod]);

  return (
    <aside className=" min-h-full xl:w-[30%]">
      <div className="flex flex-col mt-10 mb-10 gap-10">
        <MetodosDePago />
        <ProdRelacionados prods={prods} />
      </div>
    </aside>
  );
};

export default Aside;
