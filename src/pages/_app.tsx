/*

 -> É o provider da aplicação NextJS.
 -> Ele é recarregado toda vez que o usuário muda de tela.

*/

import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider } from "next-auth/react";

import "../styles/global.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
