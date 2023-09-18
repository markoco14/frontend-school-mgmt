import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolDaySection from "@/src/modules/schedule/infrastructure/ui/components/SchoolDaySection";

export default function Schedule() {
  const { user } = useUserContext();

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid gap-4">
        {/* <SchoolHeader /> */}
        <SchoolDaySection />
      </div>
    </Layout>
  );
}
