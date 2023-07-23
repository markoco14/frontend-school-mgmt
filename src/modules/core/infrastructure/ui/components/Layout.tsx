import { ReactNode } from "react";
import Navbar from './Navbar'

type LayoutProps = {
  children?: ReactNode;
};

 
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-t from-white to-blue-200">
        <div className="max-w-[600px] mx-auto">
          <Navbar />
          <div className="bg-white p-4 rounded-lg drop-shadow-2xl">
            {children}
          </div>
        </div>
			</main>
    </>
  )
}