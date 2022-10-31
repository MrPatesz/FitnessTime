import NextAuth, { DefaultSession } from "next-auth";

interface UserBase {
  username: string;
  jwt: string;
  userId: number;
}

declare module "next-auth" {
  interface User extends UserBase {}

  interface Session {
    user: UserBase;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserBase {}
}
