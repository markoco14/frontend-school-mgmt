import { ReactNode } from "react";
import DesktopNavbar from "@/src/modules/core/components/DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen">
			<div className="hidden w-[200px] xs:block">
				<DesktopNavbar />
			</div>
			<div className="block xs:hidden">
				<MobileNavbar />
			</div>
			<div className="w-full">
				<section className="h-full w-full bg-white p-2 sm:px-16 sm:pt-8">
					{children}
				</section>
			</div>
		</div>
  );
}
