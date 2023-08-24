import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { useContext } from "react";
import SubjectSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectSection";
import SubjectLevelSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectLevelSection";

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
      <SchoolHeader />
      <div className="grid xs:grid-cols-2 gap-4">
        <LevelSection />
        <SubjectSection />
        <SubjectLevelSection />
      </div>
    </Layout>
  );
}
