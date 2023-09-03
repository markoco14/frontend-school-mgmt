import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import DailyReportOverview from "@/src/modules/reports/infrastructure/ui/components/DailyReportOverview";
import Image from "next/image";
import { useContext } from "react";


export default function ReportsHome() {
  

  const { user } = useContext(AuthContext);
  const date = new Date();

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
        <SchoolHeader />
        <DailyReportOverview date={date}/>
      </div>
    </Layout>
  );
}
