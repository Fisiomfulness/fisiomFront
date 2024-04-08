"use client";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import ServicioReportComentario from "./ServicioReportComentario";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ServicioProfesionalComentarios = ({ comentarios }) => {
  
  const indexes = comentarios?.map((_, index) => String(index));

  return (
    <div className="m-2">
      { <Accordion selectionMode="multiple" defaultExpandedKeys={indexes}>
        {comentarios?.map((comentario, index) => (
          <AccordionItem
            key={index}
            aria-label={comentario.name}
            startContent={
              <Avatar
                isBordered
                color="primary"
                radius="lg"
                src={comentario.avatarSrc}
              />
            }
            title={comentario.name}
            subtitle={
              <StarRatings
                rating={comentario.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                name="rating"
              />
            }
          >
            <div className="flex justify-between">
              {comentario.comentario}
              <ServicioReportComentario />
            </div>
          </AccordionItem>
        ))}
      </Accordion> }
    </div>
  );
};

export default ServicioProfesionalComentarios;
