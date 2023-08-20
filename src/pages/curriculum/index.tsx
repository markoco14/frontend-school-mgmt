import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { useContext } from "react";
import SubjectSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectSection";

export default function CurriculumHome() {
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
          <SchoolHeader />
          <LevelSection />
					<SubjectSection />
      </div>
    </Layout>
  );
}
