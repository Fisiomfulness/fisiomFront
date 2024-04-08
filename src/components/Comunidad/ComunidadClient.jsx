"use client";

import { useState } from "react";
import SearchUsers from "./SearchUser";
import UsersContainer from "./UsersContainer";
import dynamic from "next/dynamic";

const Map = dynamic(()=> import ("@/components/Map"), {
  loading: () => <p>loading...</p>,
  ssr: false
})

const ComunidadClient = ({ users }) => {
  const [usersFiltered, setUsersFiltered] = useState([...users]);

  const markers = [
    { position: [51.505, -0.09], popup: "Profesional 1" },
    { position: [51.504, -0.06], popup: "Profesional 2" },
    { position: [51.5, -0.11], popup: "Profesional 3" },
  ];

  return (
    <div className="w-full min-h-screen mb-10 flex flex-row gap-5 pt-6 md:pr-5 md:pl-5">
      <div className="w-full flex flex-col items-center gap-10 md:w-1/2 md:max-h-screen">
        <SearchUsers
          usersFiltered={usersFiltered}
          setUsersFiltered={setUsersFiltered}
          users={users}
        />
        <UsersContainer users={usersFiltered} />
      </div>
      <div className="hidden md:w-1/2 md:flex h-screen">
        <Map markers={markers} />
      </div>
    </div>
  );
};

export default ComunidadClient;
