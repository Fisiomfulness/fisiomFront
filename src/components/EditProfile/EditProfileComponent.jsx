'use client';

import { useUser } from '@/hooks/useUser';
import EditProfileFormProfessional from './EditProfileForms/EditProfileFormProfessional';
import EditProfileFormUser from './EditProfileForms/EditProfileFormUser';

export const EditProfileComponent = () => {
  const { user } = useUser();

  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      {user.role === 'professional' ? (
        <EditProfileFormProfessional user={user} />
      ) : (
        <EditProfileFormUser user={user} />
      )}
    </main>
  );
};
