"use client";

import { axiosUserDetail } from "@/services/users";
import { useEffect, useState } from "react";
import { EditProfileFormProfessional } from "./EditProfileForms/EditProfileFormProfessional";
import EditProfileFormUser from "./EditProfileForms/EditProfileFormUser";

export const EditProfileComponent = ({ session }) => {
  const [userData, setUserData] = useState({});

  console.log(session);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosUserDetail(session.user.id);
      setUserData(response.findProfesional);
    };

    fetch();
  }, [session]);

  return (
    <main className="px-auto py-4 min-h-screen center bg-primary-400">
      {session.user?.role === "professional" ? (
        <>
          <EditProfileFormProfessional userDetail={session} />
        </>
      ) : (
        <EditProfileFormUser userDetail={session} />
      )}
    </main>
  );
};
