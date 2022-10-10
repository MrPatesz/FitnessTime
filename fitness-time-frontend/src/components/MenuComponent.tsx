import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function MenuComponent() {
  const welcomeRoute = "/welcome";

  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (router.pathname !== welcomeRoute) {
        router.replace(welcomeRoute);
      }
    },
  });

  if (!session) {
    return <></>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Link href={`/`}>Home</Link>
      <Link href={`/events`}>Events</Link>
      <Link href={`/users`}>Users</Link>

      <div style={{ display: "inline-block", flexGrow: 1 }} />

      {session.user.username}
      <button onClick={() => signOut({ callbackUrl: "/welcome" })}>
        Logout
      </button>
    </div>
  );
}
