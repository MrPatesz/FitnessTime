import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useState } from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { ApplicationShell } from "../components/ApplicationShell";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  const colorScheme = useColorScheme();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  const myTheme: MantineThemeOverride = {
    colorScheme,
    primaryColor: "violet",
    loader: "dots",
    cursorType: "pointer",
    dateFormat: "MMMM DD, YYYY",
  };

  return (
    <>
      <Head>
        <title>Fitness Time</title>
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <ApplicationShell>
              <Component {...pageProps} />
            </ApplicationShell>
          </QueryClientProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}
