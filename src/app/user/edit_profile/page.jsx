import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { axiosUserDetail } from '@/services/users';
import { EditProfileComponent } from '@/components/EditProfile/EditProfileComponent';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic' // * No cache of data

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const response = await axiosUserDetail(session.user?.id);
  return (
    <main className="px-auto py-4 min-h-[92vh] center bg-primary-400 overflow-hidden">
      <EditProfileComponent
        user={response.foundUser}
        currentSession={session}
      />
    </main>
  );
};

export default EditProfilePage;
