import { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function GuestLayout({ children }: LayoutProps) {
  return <>{children}</>
}
