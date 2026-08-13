import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } =
    NextAuth({

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

                    const validPassword =
                        await bcrypt.compare(
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
            authorized({ auth }) {
                return !!auth;
            },
        },
    });