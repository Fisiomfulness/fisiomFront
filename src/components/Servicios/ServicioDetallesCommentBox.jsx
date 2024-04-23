"use client";
import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";
import { Input, Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaBullseye } from "react-icons/fa";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioDetallesCommentBox = ({profesional}) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      axios
      .post(apiEndpoints.professionalScore, {
        score: rating,
        description: comment,
        name,
        _professional: profesional._id,
        _user: "" // TODO: get user
      })
      setRating(0);
      setName("");
      setComment("");
      setLoading(false)
    } catch (error) {
      console.log(error) // TODO: move to toast
      setLoading(false)
    }
  };

  return (
    <form className="m-4" onSubmit={onSubmitComment}>
      <Input
        type="comentario"
        variant="underlined"
        label={`Deja un comentario a ${profesional?.name}`}
        value={comment}
        onValueChange={setComment}
      />
      <Input
        className="w-1/2"
        type="nombre"
        variant="underlined"
        label={`Tu nombre`}
        value={name}
        onValueChange={setName}
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
        <Button color="primary" radius="md" type="submit">
          Comentar
        </Button>
      </div>
    </form>
  );
};

export default ServicioDetallesCommentBox;
