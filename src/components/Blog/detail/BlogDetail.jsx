import React from "react";
import { Image } from "@nextui-org/react";

function BlogDetail({ data }) {
  return (
    <div className="w-full flex flex-col justify-center items-center my-6">
      <h1>{data.title}</h1>
      <p className="font-semibold mt-3">
        {data.description} Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Mollitia dicta aut quae magnam.
      </p>
      <div className="my-6">
        <Image
          src={data.imageUrl}
          alt="NextUI Album Cover"
          className="rounded-none mb-2 w-full"
        />
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus autem
          repellendus tempora! Itaque ex, quisquam ducimus ab quaerat, suscipit
          eveniet, libero cumque laboriosam est exercitationem
        </p>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        voluptatum quia libero nesciunt? Exercitationem ad minus ex, tenetur qui
        totam provident odit id natus, perspiciatis cumque omnis expedita ullam
        voluptatibus! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Id totam necessitatibus minima. Repellat nulla facilis voluptate vel
        ipsam! Sunt suscipit officiis tenetur eum dolor sint. Reprehenderit
        reiciendis qui vero et! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nulla harum animi inventore, hic neque maxime vero
        perferendis, assumenda quis, nisi ullam mollitia rem unde incidunt atque
        voluptatibus voluptatem excepturi libero?
      </p>
    </div>
  );
}

export default BlogDetail;
