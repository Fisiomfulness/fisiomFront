import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServices } from '@/services/professionals';
import { CustomTable, CustomTableHeader } from '@/features/ui';
import CustomTableBody from '@/components/Servicios/Mis_Servicios/CustomTableBody';
import roles from '@/utils/roles';
import NoServicesUI from '@/components/Servicios/Mis_Servicios/NoServicesUI';

const SERVICES_PER_PAGE = 10;

const MisServiciosPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== roles.PROFESSIONAL) return redirect('/404');

  const initialQuery = {
    limit: SERVICES_PER_PAGE,
    professionalId: session.user.id,
  };
  const data = await getServices(initialQuery);

  return (
    <main className="w-full mx-auto px-auto max-w-8xl vstack center gap-10 min-h-[92dvh] overflow-hidden">
      {data.services.length > 0 ? (
        <>
          <h1 class="text-center font-sans uppercase bg-gradient-to-r from-primary-600 to-primary-800 inline-block text-transparent bg-clip-text">
            {`Tus servicios (${data.totalServices || 0})`}
          </h1>
          <div className="max-w-full h-[520px] pr-2 overflow-auto">
            <table className="text-left text-black rounded-sm shadow-md">
              <CustomTableHeader
                headers={['Servicio', 'Descripción', 'Precio', '']}
              />
              <CustomTableBody
                services={data.services}
                initialQuery={initialQuery}
              />
            </table>
          </div>
        </>
      ) : (
        <NoServicesUI />
      )}
    </main>
  );
};

export default MisServiciosPage;
