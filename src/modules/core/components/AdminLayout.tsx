import { ReactNode } from "react";
import Navbar from "@/src/modules/core/components/Navbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex">
			<div className="hidden w-[200px] xs:block">
				<Navbar />
			</div>
			<div className="w-full">
				{children}
			</div>
		</div>
  );
}
