import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();
export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(req) {
        const admin = await prisma.user.findUnique({
          where: {
            username: req.username,
          },
        });
        if (admin) {
          if (
            req.username === admin.username &&
            req.password === admin.password
          ) {
            return admin;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        username: token.name,
      };
      return session;
    },
  },
  pages: {
    signIn: "/CustomSignIn",
  },
});
