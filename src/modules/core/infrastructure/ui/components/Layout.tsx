import Script from "next/script";
import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Script
        async
        src="https://kit.fontawesome.com/d0c81e3c08.js"
        crossOrigin="anonymous"
      />
      <main className="box-border min-h-screen">{children}</main>
    </>
  );
}
