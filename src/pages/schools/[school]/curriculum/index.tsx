import { AuthUser } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import Layout from "@/src/modules/core/components/Layout";
import PermissionDenied from "@/src/modules/core/components/PermissionDenied";
import LevelSection from "@/src/modules/curriculum/levels/components/LevelSection";
import SubjectSection from "@/src/modules/curriculum/subjects/components/SubjectSection";
import { NextPageWithLayout } from "@/src/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

type CurriculumPageProps = {
  user: AuthUser
}

const CurriculumPage: NextPageWithLayout<CurriculumPageProps> = ({ user }) => {
  const router = useRouter();
  const schoolSlug = router.query.school as string;
  const tab = router.query.tab

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
            <ul className="flex flex-col">
              <Link href={`/schools/${schoolSlug}/curriculum?tab=levels`}>Levels</Link>
              <Link href={`/schools/${schoolSlug}/curriculum?tab=subjects`}>Subjects</Link>
            </ul>
            {!tab || tab == "levels" ? (
              <LevelSection />
            ) : (
              <SubjectSection />
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