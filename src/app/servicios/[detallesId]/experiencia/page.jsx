import ServicioExperienciaCard from "@/components/Servicios/ServicioExperienciaCard";
import data from "@/components/Servicios/data/profesionales.json";
import profesionalFinder from "@/components/Servicios/utils/utils";


const ServicioExperiencia = async ({ params }) => {
  const profesional = await profesionalFinder(params, data)

  return (
    <div>
      <ServicioExperienciaCard experiencia={profesional.experiencia} />
    </div>
  );
};

export default ServicioExperiencia;
