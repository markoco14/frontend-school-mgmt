import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import ParamsPageTabNav from "@/src/modules/core/infrastructure/ui/components/ParamsPageTabNav";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
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
      <section className="grid gap-4 sm:p-8">
        <ParamsPageTabNav links={links} tab={tab} />
        {tab === "teachers" && <TeacherSection />}
        {tab === "admins" && <AdminSection />}
      </section>
    </Layout>
  );
}
