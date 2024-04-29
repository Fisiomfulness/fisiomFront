"use client";
import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";
import { Input, Chip, Button } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaBullseye } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioDetallesCommentBox = ({ profesional }) => {
  const router = useRouter();
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(apiEndpoints.professionalScore, {
        score: rating,
        description: comment,
        name,
        _profesional: profesional._id,
        _user: user.id,
      });
      toast.success("Gracias por tu valoración!");
      router.refresh();
    } catch (error) {
      toast.error("Oops! Vuelva a intentarlo");
      setLoading(false);
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
        <Button color="primary" radius="md" type="submit" loading={loading}>
          Comentar
        </Button>
      </div>
    </form>
  );
};

export default ServicioDetallesCommentBox;
