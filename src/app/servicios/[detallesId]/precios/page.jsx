import ServicioPrecioCard from "@/components/Servicios/ServicioPrecioCard";
import data from "@/components/Servicios/data/profesionales.json";
import profesionalFinder from "@/components/Servicios/utils/utils";


const ServicioPrecios = async ({params}) => {
  const profesional = await profesionalFinder(params, data);
  
  return (
    <div>
      <ServicioPrecioCard servicios={profesional.servicios} />
    </div>
  );
};

export default ServicioPrecios;
