import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import CurriculumNav from "@/src/modules/curriculum/components/CurriculumNav";
import LevelSection from "@/src/modules/curriculum/components/LevelSection";
import SubjectSection from "@/src/modules/curriculum/components/SubjectSection";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { NextPageWithLayout } from "@/src/pages/_app";
import { ReactElement, useState } from "react";

type CurriculumPageProps = {
  user: AuthUser
}

const CurriculumPage: NextPageWithLayout<CurriculumPageProps> = ({ user }) => {
  const [tab, setTab] = useState<number>(1);

  const [subjectLevels, setSubjectLevels] = useState<SubjectLevel[]>([]);
  // const schoolSlug = router.query.school as string

  // useEffect(() => {
  //   async function getSubjectLevels() {
  //     await subjectLevelAdapter
  //       .listSchoolSubjectLevels({ schoolId: Number(selectedSchool?.id) })
  //       .then((res) => {
  //         setSubjectLevels(res);
  //       });
  //   }
    
  //     getSubjectLevels();
  //   }
  // }, [selectedSchool]);
 

  if (user && user.membership !== "OWNER") {
    return (
      <Layout>
        <AdminLayout>
          <PermissionDenied />
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
            {tab === 1 ? (
              <LevelSection />
            ) : (
              <SubjectSection
                subjectLevels={subjectLevels}
                setSubjectLevels={setSubjectLevels}
              />
            )}
          </div>
        </div>
      </AdminLayout>
    </Layout>
  );
}

CurriculumPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}

export default CurriculumPage