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

  const getNavLink = (
    label: string,
    route: string,
    icon: JSX.Element
  ): JSX.Element => (
    <Link href={route} passHref>
      <NavLink
        component="a"
        label={label}
        icon={icon}
        active={router.route === route}
      />
    </Link>
  );

  return (
    <AppShell
      hidden={!session}
      navbar={
        <Navbar width={{ base: 200 }} p="xs">
          {getNavLink("Calendar", "/calendar", <IconCalendarEvent size={16} />)}
          {getNavLink("Feed", "/feed", <IconNews size={16} />)}
          {getNavLink("My Events", "/events", <IconAdjustments size={16} />)}
          {getNavLink("Users", "/users", <IconUsers size={16} />)}
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
