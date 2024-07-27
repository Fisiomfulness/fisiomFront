import ServicioPrecioCard from "@/components/Servicios/ServicioPrecioCard";
import { getProfessionalDetail } from "@/services/professionals";

const ServicioPrecios = async ({ params }) => {
  const professionalId = params.detallesId;
  const { professional } = await getProfessionalDetail(professionalId);

  return (
    <div className="pb-4">
      <ServicioPrecioCard
        servicios={professional.services}
        detallesId={professionalId}
      />
    </div>
  );
};

export default ServicioPrecios;
