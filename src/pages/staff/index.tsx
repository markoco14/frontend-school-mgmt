import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import AdminSection from "@/src/modules/user-mgmt/infrastructure/ui/AdminSection";
import TeacherSection from "@/src/modules/user-mgmt/infrastructure/ui/TeacherSection";
import { useContext } from "react";

export default function Staff() {
  const { user } = useContext(AuthContext)

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid gap-4">
        {/* <SchoolHeader /> */}
        <TeacherSection />
        <AdminSection />
      </div>
    </Layout>
  );
}
