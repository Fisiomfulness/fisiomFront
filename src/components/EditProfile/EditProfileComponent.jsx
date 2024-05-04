'use client';

import { useUser } from '@/hooks/useUser';
import { axiosUserDetail } from '@/services/users';
import { useEffect, useState } from 'react';
import { EditProfileFormProfessional } from './EditProfileForms/EditProfileFormProfessional';
import EditProfileFormUser from './EditProfileForms/EditProfileFormUser';

export const EditProfileComponent = () => {
  const { user } = useUser();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosUserDetail(user.userId);
      setUserData(response.findProfesional);
    };

    fetch();
  }, [user.userId]);

  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      {user?.role === 'professional' ? (
        <>
          <EditProfileFormProfessional userDetail={userData} />
        </>
      ) : (
        <EditProfileFormUser userDetail={userData} />
      )}
    </main>
  );
};
