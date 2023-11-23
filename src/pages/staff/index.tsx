import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import AdminSection from "@/src/modules/user-mgmt/components/AdminSection";
import TeacherSection from "@/src/modules/user-mgmt/components/TeacherSection";
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
        <div className="h-full w-full bg-white">
          <section className="grid max-w-[1000px] gap-4">
            <ParamsPageTabNav links={links} tab={tab} />
            {tab === "teachers" && <TeacherSection />}
            {tab === "admins" && <AdminSection />}
          </section>
        </div>
      </AdminLayout>
    </Layout>
  );
}
