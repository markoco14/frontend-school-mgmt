import { ReactNode } from "react";
import Navbar from "@/src/modules/core/infrastructure/ui/components/Navbar";

type LayoutProps = {
  children?: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex">
			<div className="hidden w-[200px] xs:block">
				<Navbar />
			</div>
			{children}
		</div>
  );
}
