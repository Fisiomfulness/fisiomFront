"use client";

import { axiosUserDetail } from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EditProfileFormProfessional } from "./EditProfileForms/EditProfileFormProfessional";
import EditProfileFormUser from "./EditProfileForms/EditProfileFormUser";

export const EditProfileComponent = () => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosUserDetail(session.user.id);
      setUserData(response.findProfesional);
    };

    fetch();
  }, [session.user.id]);

  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      {session.user?.role === "professional" ? (
        <>
          <EditProfileFormProfessional userDetail={userData} />
        </>
      ) : (
        <EditProfileFormUser userDetail={userData} />
      )}
    </main>
  );
};
