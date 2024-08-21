import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServices } from '@/services/professionals';
import { CustomTable, CustomTableHeader } from '@/features/ui';
import roles from '@/utils/roles';
import MyServices from '@/components/Servicios/Mis_Servicios/MyServices';

const SERVICES_PER_PAGE = 10;

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== roles.PROFESSIONAL) return redirect('/404');

  const initialQuery = {
    limit: SERVICES_PER_PAGE,
    professionalId: session.user.id,
  };
  const data = await getServices(initialQuery);

  return (
    <main className="w-full mx-auto px-auto max-w-8xl vstack center gap-10 min-h-[92dvh] overflow-hidden">
      <MyServices
        professionalId={session.user.id}
        data={{ ...data, query: initialQuery }}
      />
    </main>
  );
};

export default page;
