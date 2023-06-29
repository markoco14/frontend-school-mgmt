import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '@/src/context'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}
