import CardUser from "./CardUser";

const UsersContainer = ({ users }) => {
  return (
    <div className="flex flex-col gap-5 w-full pr-2">
      {users.length ? (
        users.map((user) => <CardUser key={user._id} user={user} />)
      ) : (
        <div>No hay usuarios.</div>
      )}
    </div>
  );
};

export default UsersContainer;
