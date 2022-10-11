import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import MenuComponent from "../components/MenuComponent";
import { useState } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
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

  return (
    <>
      <Head>
        <title>Fitness Time</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <MenuComponent />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
