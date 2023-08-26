import { ReactNode, useContext } from "react";
import Navbar from './Navbar'
import AuthContext from "@/src/AuthContext";
import Head from "next/head";
import Script from "next/script";

type LayoutProps = {
  children?: ReactNode;
};

 
export default function Layout({ children }: LayoutProps) {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <Script async src="https://kit.fontawesome.com/d0c81e3c08.js" crossOrigin="anonymous"/>

      <main className="min-h-screen bg-white xs:bg-gradient-to-t xs:from-white xs:to-blue-200 pb-32">
        <div className={`xs:max-w-[1000px] mx-auto ${!user ? 'pt-[48px]' : ''}`}>
          {user && <Navbar />}
          <div className="bg-white p-4 xs:rounded-lg xs:drop-shadow-2xl">
            {children}
          </div>
        </div>
			</main>
    </>
  )
}