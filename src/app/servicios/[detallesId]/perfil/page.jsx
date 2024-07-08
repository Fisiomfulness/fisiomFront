import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getProfessionalDetail, getProfessionalRatings } from '@/services/professionals';
import axios from 'axios';
import ServicioDetallesCommentBox from '@/components/Servicios/ServicioDetallesCommentBox';
import ServicioProfesionalCard from '@/components/Servicios/ServicioProfesionalCard';
import ServicioProfesionalComentarios from '@/components/Servicios/ServicioProfesionalComentarios';

const MAX_RATINGS_PER_PAGE = 6;

const ServicioDetalles = async ({ params }) => {
  const professionalId = params.detallesId;
  const session = await getServerSession(authOptions);
  const { professional } = await getProfessionalDetail(professionalId);
  const dataComments = await getProfessionalRatings(professionalId, 0, MAX_RATINGS_PER_PAGE)

  return (
    <section className="w-full mt-2 vstack">
      <ServicioProfesionalCard professional={professional} />
      <ServicioProfesionalComentarios
        professional={professional}
        dataComments={dataComments}
        MAX_RATINGS_PER_PAGE={MAX_RATINGS_PER_PAGE}
        session={session}
      />
    </section>
  );
};

export default ServicioDetalles;
