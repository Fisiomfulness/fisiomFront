import { getProfessionalDetail, getServices } from '@/services/professionals';
import ServicioPrecioCard from '@/components/Servicios/ServicioPrecioCard';

export const dynamic = 'force-dynamic';

const ServicioPrecios = async ({ params }) => {
  const professionalId = params.detallesId;
  const { professional } = await getProfessionalDetail(professionalId);
  const { services } = await getServices({ professionalId });

  return (
    <section className="w-full flex flex-col my-2 gap-4 grow lg:max-h-[800px] overflow-y-auto">
      <ServicioPrecioCard professional={professional} services={services} />
    </section>
  );
};

export default ServicioPrecios;
