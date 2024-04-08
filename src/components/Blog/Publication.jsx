import React from "react";
import { Image } from "@nextui-org/react";

function Publication({ data }) {
  return (
    <div className="w-full flex flex-row items-center">
      <Image
        isBlurred
        width={60}
        src={data.imageUrl}
        alt="NextUI Album Cover"
        classNames="m-5"
      />
      <div className="ml-5">
        <h2 style={{ fontSize: "0.7rem", marginBottom: 0 }}>{data.title}</h2>
        <h4 style={{ fontSize: "0.6rem", marginTop: 0 }}>{data.description}</h4>
        <h6 style={{ fontSize: "0.5rem" }}>{data.date}</h6>
      </div>
    </div>
  );
}

export default Publication;
