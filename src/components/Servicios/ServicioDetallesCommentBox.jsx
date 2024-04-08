"use client";
import { Input, Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioDetallesCommentBox = ({profesional}) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="m-4">
      <Input
        type="comentarios"
        variant="underlined"
        label={`Deja un comentario a ${profesional?.nombre}`}
      />
      <div className="flex items-center justify-between mt-2">
        <Chip color="primary" size="lg" variant="bordered" className="mr-2">
          Valoracion:
          <StarRatings
            starRatedColor="#ffb829"
            starHoverColor="#ffb829"
            isSelectable={true}
            rating={rating}
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            name="rating"
          />
        </Chip>
        <Button color="primary" radius="md">
          Comentar
        </Button>
      </div>
    </div>
  );
};

export default ServicioDetallesCommentBox;
