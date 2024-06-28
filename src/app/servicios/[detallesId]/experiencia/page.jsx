import axios from 'axios';
import ServicioExperienciaCard from '@/components/Servicios/ServicioExperienciaCard';
import { apiEndpoints } from '@/api_endpoints';

export const dynamic = 'force-dynamic';

const ServicioExperiencia = async ({ params }) => {
  const profesionalId = params.detallesId;
  const { data } = await axios.get(
    apiEndpoints.professionalsDetail + profesionalId
  );

  return (
    <section className="w-full flex flex-col mt-2 gap-4 grow lg:max-h-[800px] overflow-y-auto ">
      <ServicioExperienciaCard experience={data?.professional.experience} />
    </section>
  );
};

export default ServicioExperiencia;
