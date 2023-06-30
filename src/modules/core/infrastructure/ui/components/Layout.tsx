import { ReactNode } from "react";
import Navbar from './Navbar'

type LayoutProps = {
  children?: ReactNode;
};

 
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="min-h-screen max-w-[600px] mx-auto">
				<Navbar />
				{children}
			</main>
    </>
  )
}