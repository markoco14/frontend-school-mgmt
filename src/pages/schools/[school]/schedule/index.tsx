import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import SchoolDaySection from "@/src/modules/schedule/components/SchoolDaySection";

export default function Schedule() {
  const { user } = useUserContext();

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <AdminLayout>
          <div className="h-full w-full bg-white">
            <PermissionDenied />
          </div>
        </AdminLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminLayout>
        <div className="h-full w-full bg-white">
          <div className="grid max-w-[1000px] gap-4">
            {/* <SchoolHeader /> */}
            <SchoolDaySection />
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}
