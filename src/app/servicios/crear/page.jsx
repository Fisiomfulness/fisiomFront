import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ServiceForm from '@/components/Servicios/ServiceForm';
import roles from '@/utils/roles';

export const metadata = {
  title: 'Publica un servicio',
};

const CreateService = async () => {
  const session = await getServerSession(authOptions);

  if(!session || session?.user.role !== roles.PROFESSIONAL) return redirect('/404');

  return (
    <section className="flex flex-col items-center justify-center container m-auto p-2 px-auto min-h-[92vh]">
      <div className="size-full max-w-[420px] px-6 py-12 bg-white shadow-md">
        <ServiceForm professionalId={session.user.id} />
      </div>
    </section>
  );
};

export default CreateService;
