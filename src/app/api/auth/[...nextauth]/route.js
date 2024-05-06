// @ts-check
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Formulario Next Auth",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          // NOTE: no fue necesario incluir las credenciales
          // credentials: "include",
        });

        const headerCookies = res.headers.getSetCookie();
        const accessTokenValues = Object.fromEntries(
          (headerCookies.find((c) => c.includes("accessToken=")) || "")
            .split("; ")
            .map((v) => v.split(/=(.*)/s).map(decodeURIComponent)),
        );

        cookies().set({
          name: "accessToken",
          value: accessTokenValues.accessToken,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: accessTokenValues["Max-Age"],
          path: "/",
        });

        if (!res.ok) throw new Error("No autorizado");

        const user = await res.json();

        // NOTE: Next Auth retorna un objecto usuario con id, name y email.
        return {
          id: user.userId,
          ...user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      delete token.userId // ? user.id already exists
      session.user = token;
      return session;
    },
  },
  events: {
    async signOut() {
      cookies().delete("accessToken");
    },
  },
});

export const GET = handler;
export const POST = handler;
