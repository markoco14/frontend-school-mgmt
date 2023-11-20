import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function GuestLayout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <p>Nav Links</p>
      </header>
      <main>{children}</main>
    </>
  );
}
