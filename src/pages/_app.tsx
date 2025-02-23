import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import UserContextProvider, { useUserContext } from "../contexts/UserContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function AppContent({ Component, pageProps }: AppPropsWithLayout) {
  const { user } = useUserContext();
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} user={user} />)
}

export default function App(props: AppPropsWithLayout) {
  return (
    <UserContextProvider>
      <AppContent {...props} />
      <Toaster />
    </UserContextProvider>
  );
}
