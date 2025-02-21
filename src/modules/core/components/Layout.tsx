import { Spinner } from "@/src/components/ui/spinner";
import { useUserContext } from "@/src/contexts/UserContext";
import Script from "next/script";
import { ReactNode } from "react";

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
      {!user ? (<main className="box-border min-h-screen flex justify-center pt-24"><Spinner size={48}/></main>) : (

        <main className="box-border min-h-screen">{children}</main>
      )}
    </>
  );
}
