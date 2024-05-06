// NOTE: importar next-auth para conservar las declaraciones base
import NextAuth from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

// NOTE: next-auth necesita que algunos tipos sean `string | null | undefined`
interface User {
  id: string;
  name?: string | null;
  image?: string | null;
  email?: string | null;
  role: string;
  coordinates: string[];
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
