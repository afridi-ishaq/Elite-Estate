import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // Put role inside JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    // Make role available through auth()
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },

    // Protect admin routes
    authorized({ auth, request }) {
      const isAdminRoute =
        request.nextUrl.pathname.startsWith("/admin");

      // Normal public pages remain accessible
      if (!isAdminRoute) {
        return true;
      }

      // Not logged in
      if (!auth?.user) {
        return false;
      }

      // Only ADMIN
      return auth.user.role === "ADMIN";
    },
  },
});