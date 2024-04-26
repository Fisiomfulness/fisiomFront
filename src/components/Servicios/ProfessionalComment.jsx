import { useState } from "react";
import { User, Link } from "@nextui-org/react";
import Stars from "./Stars";
import ServicioReportComentario from "./ServicioReportComentario";

export default function ProfessionalComment({ comment }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="bg-primary-50 p-4 rounded-lg hover:bg-[#D8EEF8] md:p-6 lg:p-8"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <User
          name={comment.name}
          description={<Stars rating={comment.score} />}
          avatarProps={{
            src: comment.image,
          }}
          className="text-zinc-800 italic"
        />
        <ServicioReportComentario />
      </div>
      <p className={`text-sm ${expanded ? "line-clamp-none" : "line-clamp-3"}`}>
        {comment.description}
      </p>
    </div>
  );
}
