"use client"
import { useEffect, useState } from "react";
import Aside from "./Aside";
import DetailClient from "./DetailClient";
import { apiEndpoints } from "@/api_endpoints";

const Detail = ({ productId }) => {
  const [prod, setProd] = useState({})
  useEffect(() => {
    fetch(apiEndpoints.productsDetail + productId, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setProd(data.product)
      })
  }, [productId])

  return (
    <div className="flex flex-col w-full min-h-screen items-center xl:flex-row xl:items-start">
      <DetailClient prod={prod} />
      <Aside prod={prod} />
    </div>
  );
};

export default Detail;
