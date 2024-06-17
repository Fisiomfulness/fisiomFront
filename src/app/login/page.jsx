import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Login } from "../../components/Login";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Inicio de sesión",
  description: "Inicia sesión en fisiomfulness",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main className="px-auto min-h-screen center bg-primary-400">
      <Login />
    </main>
  );
}
