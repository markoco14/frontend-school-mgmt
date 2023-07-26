import { ReactNode, useContext } from "react";
import Navbar from './Navbar'
import AuthContext from "@/src/AuthContext";

type LayoutProps = {
  children?: ReactNode;
};

 
export default function Layout({ children }: LayoutProps) {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <main className="min-h-screen bg-white xs:bg-gradient-to-t xs:from-white xs:to-blue-200">
        <div className="xs:max-w-[600px] mx-auto">
          {user && <Navbar />}
          <div className="bg-white p-4 xs:rounded-lg xs:drop-shadow-2xl">
            {children}
          </div>
        </div>
			</main>
    </>
  )
}