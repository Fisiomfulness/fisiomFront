import { Login } from "../../components/Login";

export const metadata = {
  title: 'Inicio de sesión',
  description: 'Inicia sesión en fisiomfulness',
};

const Page = () => {
  return (
    <main className="px-auto min-h-screen center bg-primary-400">
      <Login />
    </main>
  );
};
export default Page;
