import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Fitness Time</title>
      </Head>
      <div className="d-flex flex-row">
        <Link href={`/events`}>Events</Link>
        <Link href={`/users`}>Users</Link>
      </div>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
