// @ts-check
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  console.log({ session, status });

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (session) {
    return (
      <main>
        Logeado como {session.user?.email} <br />
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
        <button onClick={() => signOut()}>Sign out</button>
      </main>
    );
  }
  return (
    <main>
      No logeado <br />
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
