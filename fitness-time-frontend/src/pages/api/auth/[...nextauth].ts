import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import AuthService from "../../../services/AuthService";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
  },
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, _req) {
        const authService = AuthService();

        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const jwt = await authService.login({ username, password });
          return { jwt, username };
        } catch (error: any) {
          console.log(error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.username = user.username;
        token.jwt = user.jwt;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.jwt = token.jwt;
      session.user.username = token.username;
      return session;
    },
  },
  // TODO maybe custom login page
  //   pages: {
  //     signIn: "/login",
  //   },
};

export default NextAuth(authOptions);
