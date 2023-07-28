import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { ReportList } from "@/src/modules/report-mgmt/infrastructure/ui/components/ReportList";
import Link from "next/link";
import { useContext } from "react";


export default function ReportsHome() {
  const { user } = useContext(AuthContext);

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <h2>You do not have permission to access this page.</h2>
        <Link href="/">Back to Home</Link>
      </Layout>
    )
  }
  return (
    <Layout>
      <div>
        <section>
          <SchoolHeader />
          <ReportList />
        </section>
      </div>
    </Layout>
  );
}
