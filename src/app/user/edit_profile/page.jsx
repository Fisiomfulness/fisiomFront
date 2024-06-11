import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getUserDetail } from '@/services/users';
import { getInterests } from '@/services/interests';
import { notFound } from 'next/navigation';
import EditProfileComponent from '@/components/EditProfile/EditProfileComponent';

export const dynamic = 'force-dynamic'; // * No cache of data

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const { foundUser } = await getUserDetail(session.user?.id);
  const { interests } = await getInterests();

  return (
    <main className="px-auto py-4 min-h-[92vh] center bg-primary-400 overflow-hidden">
      <EditProfileComponent
        user={foundUser}
        currentSession={session}
        interests={interests}
      />
    </main>
  );
};

export default EditProfilePage;
