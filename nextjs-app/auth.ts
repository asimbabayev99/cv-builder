import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

// Mock user database — replace with a real DB in production
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    // Pre-hashed password for "password123"
    password: '$2b$10$IPDejAgufEhZrtR57lFS0ebgZtFMqlkbXX2NdMgwhoTytLIn6Azvq',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsYhtAXQTA7BqKHtOD1kTv0rurbABmYsA6oXZoYfRGG6_eD4arQRa7s04WfDIyARH-gT1vpjIW9Pk5prri1lJCRzB_XkL3J0HyZV77JcADZUJSJ7hd_D1chSHnSfUaBkayuVlS8F7_PCR6zQq33IaKTT-ABBCgEn10leJ_zFiASrS7HtlNgCD01THX02FZKaqgb2MQGMEecAE_ZyrhawSyQ2whrdPO3d1oANrdO9v7V0N2OBplULOJBXnnUu9P8aWgfi2VVyUP82E',
  },
];

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

        const user = MOCK_USERS.find(
          (u) => u.email === credentials.email
        );

        if (!user) {
          return null;
        }

        // Dynamic import to avoid Edge runtime issues in middleware
        const bcrypt = await import('bcryptjs');
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
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
