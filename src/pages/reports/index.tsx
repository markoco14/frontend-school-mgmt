import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { ReportList } from "@/src/modules/reports/infrastructure/ui/components/ReportList";
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
          <ReportList />
        </section>
      </div>
    </Layout>
  );
}
