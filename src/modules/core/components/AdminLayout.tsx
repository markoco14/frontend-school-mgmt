import { ReactNode } from "react";
import Navbar from "@/src/modules/core/components/Navbar";
import MobileNavbar from "./MobileNavbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen">
			<div className="hidden w-[200px] xs:block">
				<Navbar />
			</div>
			<div className="block xs:hidden">
				<MobileNavbar />
			</div>
			<div className="w-full">
				{children}
			</div>
		</div>
  );
}
