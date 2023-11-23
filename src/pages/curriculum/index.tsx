import { useUserContext } from "@/src/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { subjectLevelAdapter } from "@/src/modules/curriculum/adapters/subjectLevelAdapter";
import CurriculumNav from "@/src/modules/curriculum/infrastructure/ui/components/CurriculumNav";
import LevelSection from "@/src/modules/curriculum/infrastructure/ui/components/LevelSection";
import SubjectSection from "@/src/modules/curriculum/infrastructure/ui/components/SubjectSection";
import { useEffect, useState } from "react";

export default function CurriculumHome() {
  const { user, selectedSchool } = useUserContext();
  const [tab, setTab] = useState<number>(1);

  const [subjectLevels, setSubjectLevels] = useState<SubjectLevel[]>([]);

  useEffect(() => {
    async function getSubjectLevels() {
      await subjectLevelAdapter
        .listSchoolSubjectLevels({ schoolId: Number(selectedSchool?.id) })
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
          <div className="max-w-[1000px]">
            <CurriculumNav tab={tab} setTab={setTab} />
            {tab === 1 && (
              <SubjectSection
                subjectLevels={subjectLevels}
                setSubjectLevels={setSubjectLevels}
              />
            )}
            {tab === 2 && <LevelSection />}
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}
