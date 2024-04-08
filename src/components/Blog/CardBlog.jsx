"use client";
import React from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CardBlog({ cardData }) {
  const router = useRouter();

  return (
    <div className="max-w-full lg:max-w-[900px] mx-auto gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="col-span-1 flex flex-col items-center h-auto rounded-none"
        >
          <Card className="w-full h-full rounded-none shadow-lg">
            <Image
              removeWrapper
              alt={`Card background ${card.id}`}
              className="z-0 w-full h-48 object-cover rounded-none"
              src={card.imageUrl}
            />
            <CardHeader
              onClick={() => router.push(`/blog/${card.id}`)}
              className="relative z-10 w-full flex flex-col items-start bg-[#D8EEF8] h-auto p-4 cursor-pointer rounded-none"
            >
              <div>
                <p className="text-xs lg:text-sm text-black uppercase font-bold">
                  {card.title}
                </p>
                <h6 className="text-xs lg:text-sm text-black font-medium overflow-hidden ">
                  {card.description}
                </h6>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
