// @ts-check
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="overflow-hidden px-auto py-4 max-w-8xl">
      {session ? (
        <>
          <p>Logeado como: {session.user.name}</p>
          <pre className="overflow-auto debug">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </>
      ) : (
        <p>No logeado</p>
      )}
    </main>
  );
}
