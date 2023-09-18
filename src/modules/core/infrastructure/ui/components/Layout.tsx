import { useUserContext } from "@/src/AuthContext";
import Script from "next/script";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { user } = useUserContext();

  return (
    <>
      <Script
        async
        src="https://kit.fontawesome.com/d0c81e3c08.js"
        crossOrigin="anonymous"
      />

      <main className="box-border min-h-screen bg-white pb-32 xs:bg-gradient-to-t xs:from-white xs:to-blue-200">
        <div
          className={`mx-auto xs:max-w-[1000px] ${!user ? "pt-[48px]" : ""}`}
        >
          {user && <Navbar />}
          <div className="bg-white p-4 xs:rounded-lg xs:drop-shadow-2xl">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
