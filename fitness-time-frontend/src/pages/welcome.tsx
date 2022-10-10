import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";

export default function WelcomePage() {
  const authService = AuthService();
  const router = useRouter();
  const { data: session } = useSession();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (session) {
    router.replace("/");
  }

  return (
    <>
      <h1>Welcome to Fitness Time!</h1>
      <button onClick={() => signIn(undefined, { callbackUrl: "/" })}>
        Login
      </button>
      <input
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        placeholder="username"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        placeholder="password"
        type="password"
      />
      <button onClick={() => authService.register({ username, password })}>
        Register
      </button>
    </>
  );
}
