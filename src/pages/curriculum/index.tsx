import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";
import { useContext, useEffect, useState } from "react";
import SubjectSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectSection";
import SubjectLevelSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectLevelSection";
import { subjectLevelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectLevelAdapter";
import { Subject } from "@/src/modules/curriculum/domain/entities/Subject";
import { SubjectLevel } from "@/src/modules/curriculum/domain/entities/SubjectLevel";

export default function CurriculumHome() {
  const { user, selectedSchool } = useContext(AuthContext)


  const [subjectLevels, setSubjectLevels] = useState<any[]>([]);

  useEffect(() => {
    async function getSubjectLevels() {
      await subjectLevelAdapter
        .listSchoolSubjectLevels({ id: selectedSchool?.id })
        .then((res) => {
          setSubjectLevels(res);
        });
    }
    getSubjectLevels();
  }, [selectedSchool]);

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
        <SubjectSection subjectLevels={subjectLevels} setSubjectLevels={setSubjectLevels}/>
        <LevelSection />
        <SubjectLevelSection subjectLevels={subjectLevels}/>
      </div>
    </Layout>
  );
}
