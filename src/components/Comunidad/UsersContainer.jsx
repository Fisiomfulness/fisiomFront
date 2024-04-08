import CardUser from "./CardUser";

const UsersContainer = ({ users }) => {
  return (
    <div className="w-full flex flex-col gap-5 pr-2 pl-2 md:h-full md:overflow-scroll">
      {users.map((e) => (
        <CardUser key={e.name} user={e} />
      ))}
    </div>
  );
};

export default UsersContainer;
