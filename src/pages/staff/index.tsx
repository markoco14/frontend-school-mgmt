import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import AdminSection from "@/src/modules/user-mgmt/infrastructure/ui/AdminSection";
import TeacherSection from "@/src/modules/user-mgmt/infrastructure/ui/TeacherSection";
import { useSearchParams } from "next/navigation";

export default function Staff() {
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "teachers";

  const links = [
    {
      value: 1,
      name: "Teachers",
      urlString: "teachers",
    },
    {
      value: 2,
      name: "Admins",
      urlString: "admins",
    },
  ];

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
        <div className="bg-white h-full w-full">
          <section className="max-w-[1000px] grid gap-4">
            <ParamsPageTabNav links={links} tab={tab} />
            {tab === "teachers" && <TeacherSection />}
            {tab === "admins" && <AdminSection />}
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
