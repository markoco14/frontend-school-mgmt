import { useUserContext } from "@/src/contexts/UserContext";
import AdminLayout from "@/src/modules/core/components/AdminLayout";
import GuestLayout from "@/src/modules/core/components/GuestLayout";
import Layout from "@/src/modules/core/components/Layout";
import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import ListContainer from "../../../modules/core/components/ListContainer";
import CardContainer from "../../../modules/core/components/CardContainer";
import { Test } from "../../../modules/tests/entities/Test";
import { getSelectedSchool } from "@/src/utils/getSelectedSchool";
import { useRouter } from "next/router";

const testsToday: Test[] = [
  {
    id: 1,
    name: "Level 7 Unit 1 Test 1",
    teacher: "Mark",
  },
  {
    id: 2,
    name: "Level 10 Unit 4 Test 2",
    maxCorrections: 3,
    allowNoCorrections: true,
    teacher: "Pei",
  },
];


const SchoolPage: NextPageWithLayout = () => {
  const { user } = useUserContext();
  const date = new Date();
  const router = useRouter();
  const selectedSchool = getSelectedSchool(router.asPath);

  return (
    <>
      {!user && (
        <GuestLayout>
          <p>Please <Link href="/login">Sign In</Link> to see this page.</p>
        </GuestLayout>
      )}

      {user &&  (
        <Layout>
          <AdminLayout>
            <div className="mb-8">
              <h1 className="mb-1 text-3xl text-gray-700">
                Activities for {date.toDateString()}
              </h1>
            </div>
            <CardContainer>
              <div className="mb-4 flex items-baseline justify-between gap-16 p-2">
                <h2 className="text-xl">Tests</h2>
                <Link href={`/schools/${selectedSchool}/assessments`} className="text-gray-500">
                  See all tests
                </Link>
              </div>
              <ListContainer>
                {testsToday.map((test) => (
                  <li
                    key={`test-${test.id}`}
                    className="grid p-2 hover:bg-blue-300 sm:grid-cols-4"
                  >
                    <p className="font-bold">{test.name}</p>
                    <p>Teacher {test.teacher}</p>
                    <Link
                      href={`/schools/${selectedSchool}/assessments/do-test/${test.id}`}
                      className="underline underline-offset-2"
                    >
                      Do Test
                    </Link>
                    <Link
                      href={`/schools/${selectedSchool}/assessments/review-test/${test.id}`}
                      className="underline underline-offset-2"
                    >
                      Review Test
                    </Link>
                  </li>
                ))}
              </ListContainer>
            </CardContainer>
          </AdminLayout>
        </Layout>
      )}

    </>
  );
};

SchoolPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SchoolPage;
