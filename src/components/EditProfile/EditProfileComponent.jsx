'use client';

import { useSession } from 'next-auth/react';
import EditProfileFormProfessional from './EditProfileForms/EditProfileFormProfessional';
import EditProfileFormUser from './EditProfileForms/EditProfileFormUser';

export const EditProfileComponent = () => {
  const { data: session } = useSession()

  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      {session?.user.role === 'professional' ? (
        <EditProfileFormProfessional user={session.user} />
      ) : (
        <EditProfileFormUser user={session.user} />
      )}
    </main>
  );
};
