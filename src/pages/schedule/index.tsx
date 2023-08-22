import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import SchoolDaySection from "@/src/modules/schedule/infrastructure/ui/components/SchoolDaySection";
import { useContext } from "react";

export default function Schedule() {
  const { user } = useContext(AuthContext)

  if (user?.role !== "OWNER" ) {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid gap-4">
          <SchoolHeader />
					<SchoolDaySection />
      </div>
    </Layout>
  );
}
