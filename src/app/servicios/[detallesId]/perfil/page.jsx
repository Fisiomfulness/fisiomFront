import ServicioDetallesCommentBox from "@/components/Servicios/ServicioDetallesCommentBox";
import ServicioProfesionalCard from "@/components/Servicios/ServicioProfesionalCard";
import ServicioProfesionalComentarios from "@/components/Servicios/ServicioProfesionalComentarios";
import profesionalFinder from "@/components/Servicios/utils/utils";
import data from "@/components/Servicios/data/profesionales.json";

const ServicioDetalles = async ({ params }) => {
  const profesional = await profesionalFinder(params, data);

  return (
    <div>
      <ServicioProfesionalCard profesional={profesional} />
      <ServicioDetallesCommentBox profesional={profesional} />
      <ServicioProfesionalComentarios comentarios={profesional.reviews} />
    </div>
  );
};

export default ServicioDetalles;
