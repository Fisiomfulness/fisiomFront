import Aside from "./Aside";
import DetailClient from "./DetailClient";

const Detail = async ({ prod }) => {
  return (
    <div className="flex flex-col w-full min-h-screen items-center xl:flex-row xl:items-start">
      <DetailClient prod={prod} />
      <Aside prod={prod} />
    </div>
  );
};

export default Detail;
