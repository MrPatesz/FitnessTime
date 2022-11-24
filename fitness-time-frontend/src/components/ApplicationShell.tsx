import { AppShell, Header, Navbar, NavLink } from "@mantine/core";
import {
  IconAdjustments,
  IconCalendarEvent,
  IconNews,
  IconUsers,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HeaderComponent } from "./HeaderComponent";

export const ApplicationShell: React.FunctionComponent<{
  children: JSX.Element;
}> = ({ children }) => {
  const welcomeRoute = "/welcome";

  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (router.route !== welcomeRoute) {
        router.replace(welcomeRoute);
      }
    },
  });

  return (
    <AppShell
      hidden={!session}
      navbar={
        <Navbar width={{ base: 211 }} p="xs">
          {[
            { label: "Calendar", route: "/calendar", icon: IconCalendarEvent },
            { label: "Feed", route: "/feed", icon: IconNews },
            { label: "My Events", route: "/my-events", icon: IconAdjustments },
            { label: "Users", route: "/users", icon: IconUsers },
          ].map((link) => (
            <Link href={link.route} as={link.route} passHref key={link.label}>
              <NavLink
                component="a"
                label={link.label}
                icon={<link.icon size={16} />}
                active={router.route.includes(link.route)}
              />
            </Link>
          ))}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <HeaderComponent username={session?.user.username} />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
