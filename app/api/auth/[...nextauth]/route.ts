import { db } from '@/lib/db';
import { AuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import NextAuth from 'next-auth/next';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error('User name or password is not correct');

        if (!credentials?.password)
          throw new Error('Please Provide Your Password');
        const isPassowrdCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPassowrdCorrect)
          throw new Error('User name or password is not correct');

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure the secret is used here
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure the secret is used here
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
