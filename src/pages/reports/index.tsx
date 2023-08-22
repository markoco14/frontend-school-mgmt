import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { ReportList } from "@/src/modules/reports/infrastructure/ui/components/ReportList";
import Link from "next/link";
import { useContext } from "react";


export default function ReportsHome() {
  const { user } = useContext(AuthContext);

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }
  return (
    <Layout>
      <div>
        <section>
          <SchoolHeader />
          <div className="grid grid-cols-3">
            <Link href='reports/sample1/'>Sample 1</Link>
          </div>
          <ReportList />
        </section>
      </div>
    </Layout>
  );
}
