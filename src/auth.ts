import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/db';

const nextAuthResult = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Github],
  callbacks: {
    // only used to fix a bug (when using useSession hook user.id field does not get populated) usually not needed.
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = nextAuthResult;
