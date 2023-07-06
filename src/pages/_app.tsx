import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '@/src/context'
import { ReactElement, ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { NextPage } from 'next'
import {AuthProvider} from '../AuthContext'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [user, setUser] = useState(null)

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
    // <UserContext.Provider value={{user, setUser}}>
    //   <Component {...pageProps} />
    //   <Toaster />
    // </UserContext.Provider>
  )
}

