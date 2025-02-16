import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";

export default function Staff() {
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
      <AdminLayout>
        <div className="h-full w-full bg-white">
          <section className="grid max-w-[1000px] gap-4">
            <p>Staff section coming soon.</p>
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
