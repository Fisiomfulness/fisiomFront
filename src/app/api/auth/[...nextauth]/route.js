import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'; 
import { cookies } from 'next/headers';

/** @type {import("next-auth").NextAuthOptions} */
export const authOptions = {
  pages: { signIn: '/login' },
  providers: [
    // Proveedor de autenticación con credenciales
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Formulario Next Auth',
        },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, _req) {
        console.log('Autenticando con credenciales:', credentials);

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            console.error('Error de autenticación:', res.status);
            throw new Error('Credenciales inválidas');
          }

          const headerCookies = res.headers.getSetCookie();
          console.log('Cookies del encabezado:', headerCookies);

          const accessTokenValues = Object.fromEntries(
            (headerCookies.find((c) => c.includes('accessToken=')) || '')
              .split('; ')
              .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
          );

          console.log('Valores de accessToken:', accessTokenValues);

          cookies().set({
            name: 'accessToken',
            value: accessTokenValues.accessToken,
            httpOnly: true,
            secure: process.env.NEXT_PUBLIC_ENV === 'production',
            sameSite: 'strict',
            maxAge: accessTokenValues['Max-Age'],
            path: '/',
          });

          const user = await res.json();
          console.log('Usuario autenticado:', user);
          return user;

        } catch (error) {
          console.error('Error al autenticar:', error);
          throw new Error('Error de autenticación');
        }
      },
    }),

    // Proveedor de autenticación con Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('Callback jwt: ', { token, user }); // Log para ver los valores de token y user
  
      if (user) {
        token.name = user.name || '';  
        token.image = user.image || ''; 
      }
  
      console.log('Token después de modificación: ', token); // Log para ver el token después de la modificación
      return token;
    },
    async session({ session, token }) {
      console.log('Callback session: ', { session, token }); // Log para ver los valores de session y token
  
      session.user = token; // Esto debería incluir name e image

      return session;
    },
  },
  
  events: {
    async signOut() {
      cookies().delete('accessToken');
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
