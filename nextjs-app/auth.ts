import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(`${BACKEND_URL}/api/v1/sign-in`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          return null;
        }

        const data = await res.json();
        // data: { access_token, refresh_token, user: { id, uid, email, first_name, last_name, image, role, auth_provider } }

        return {
          id: String(data.user.id),
          name: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email,
          image: data.user.image,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // On initial sign-in, persist backend tokens
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
      }

      // For Google OAuth, exchange the Google ID token with our backend
      if (account?.provider === 'google' && account.id_token) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/google-auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: account.id_token }),
          });
          if (res.ok) {
            const data = await res.json();
            token.accessToken = data.access_token;
            token.refreshToken = data.refresh_token;
            // Update user info from backend
            token.name = `${data.user.first_name} ${data.user.last_name}`;
            token.picture = data.user.image;
          }
        } catch {
          // If backend call fails, session still works via Google data
        }
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith('/profile') ||
        nextUrl.pathname.startsWith('/builder');

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL('/auth/signin', nextUrl));
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
