import ComunidadClient from "@/components/Comunidad/ComunidadClient";
import data from "@/components/Comunidad/data/data.json";

const Page = () => {
  return <ComunidadClient users={data.users} />;
};

export default Page;
