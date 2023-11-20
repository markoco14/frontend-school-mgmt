import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import SchoolDaySection from "@/src/modules/schedule/infrastructure/ui/components/SchoolDaySection";

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
          <div className="grid gap-4 max-w-[1000px]">
            {/* <SchoolHeader /> */}
            <SchoolDaySection />
          </div>

        </div>
      </AdminLayout>
    </Layout>
  );
}
