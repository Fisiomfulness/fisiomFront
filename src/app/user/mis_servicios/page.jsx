import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServices } from '@/services/professionals';
import { CustomTable, CustomTableHeader } from '@/features/ui';
import CustomTableBody from '@/components/Servicios/Mis_Servicios/CustomTableBody';
import roles from '@/utils/roles';

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
    <main className="px-auto min-h-[92dvh] center pt-8 pb-12">
      <CustomTable>
        <CustomTableHeader
          headers={['Servicio', 'Descripción', 'Precio', '']}
        />
        <CustomTableBody services={data.services} initialQuery={initialQuery} />
      </CustomTable>
    </main>
  );
};

export default MisServiciosPage;
