"use client";

import { EditProfileComponent } from "@/components/EditProfile/EditProfileComponent";
import { useSession } from "next-auth/react";

const EditProfilePage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "loading" ? (
        <p>Cargando...</p>
      ) : (
        <EditProfileComponent session={session} />
      )}
    </>
  );
};

export default EditProfilePage;
