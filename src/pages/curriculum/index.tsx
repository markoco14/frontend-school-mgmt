import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import PermissionDenied from "@/src/modules/core/infrastructure/ui/components/PermissionDenied";
import { SubjectLevel } from "@/src/modules/curriculum/domain/entities/SubjectLevel";
import { subjectLevelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectLevelAdapter";
import CurriculumNav from "@/src/modules/curriculum/infrastructure/ui/components/CurriculumNav";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import SubjectSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectSection";
import ModuleTypeSection from "@/src/modules/curriculum/infrastructure/ui/components/module-type/ModuleTypeSection";
import ModuleSection from "@/src/modules/curriculum/infrastructure/ui/components/module/ModuleSection";
import { useEffect, useState } from "react";

export default function CurriculumHome() {
  const { user, selectedSchool } = useUserContext();
  const [tab, setTab] = useState<number>(1);

  const [subjectLevels, setSubjectLevels] = useState<SubjectLevel[]>([]);

  useEffect(() => {
    async function getSubjectLevels() {
      await subjectLevelAdapter
        .listSchoolSubjectLevels({ id: Number(selectedSchool?.id) })
        .then((res) => {
          setSubjectLevels(res);
        });
    }
    if (selectedSchool) {
      getSubjectLevels();
    }
  }, [selectedSchool]);

  if (user?.role !== "OWNER") {
    return (
      <Layout>
        <PermissionDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <SchoolHeader /> */}
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === 1 && (
        <SubjectSection
          subjectLevels={subjectLevels}
          setSubjectLevels={setSubjectLevels}
        />
      )}
      {tab === 2 && <LevelSection />}
      {tab === 3 && <ModuleSection subjectLevels={subjectLevels} />}
      {tab === 4 && <ModuleTypeSection />}
      {/* {tab === 5 && (
        <AssessmentTypeSection />
      )}
      {tab === 6 && (
        <AssessmentSection />
      )} */}
    </Layout>
  );
}
