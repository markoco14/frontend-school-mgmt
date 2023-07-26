import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { ReportList } from "@/src/modules/report-mgmt/infrastructure/ui/components/ReportList";


export default function ReportsHome() {
  // const router =

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
