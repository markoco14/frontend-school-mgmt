import { ReactNode } from "react";
import Navbar from './Navbar'

type LayoutProps = {
  children?: ReactNode;
};

 
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="min-h-screen bg-white xs:bg-gradient-to-t xs:from-white xs:to-blue-200">
        <div className="xs:max-w-[600px] mx-auto">
          <Navbar />
          <div className="bg-white p-4 xs:rounded-lg xs:drop-shadow-2xl">
            {children}
          </div>
        </div>
			</main>
    </>
  )
}