import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/src/modules/core/components/AdminLayout"
import Layout from "@/src/modules/core/components/Layout"
import Link from "next/link"
import ListContainer from "@/src/modules/core/components/ListContainer"
import { Test } from "@/src/modules/tests/entities/Test"
import CardContainer from "@/src/modules/core/components/CardContainer"
import { useUserContext } from "@/src/contexts/UserContext"

const tests: Test[] = [
  {
    id: 1,
    name: "Level 7 Unit 1 Test 1",
    maxCorrections: 2,
    allowNoCorrections: true,
  },
  {
    id: 2,
    name: "Level 10 Unit 4 Test 2",
    maxCorrections: 3,
    allowNoCorrections: true,
  },
  {
    id: 3,
    name: "Level 3 Unit 8 Test 3",
    maxCorrections: 1,
    allowNoCorrections: false,
  },
  {
    id: 4,
    name: "Level 6 Unit 2 Test 4",
    maxCorrections: 2,
    allowNoCorrections: true,
  },
];

const TestHomePage: NextPageWithLayout = () => {

  const { selectedSchool } = useUserContext();
	return (
    <Layout>
      <AdminLayout>
        <CardContainer>
          <div className="mb-4 p-2">
            <h1 className="text-3xl mb-1">{selectedSchool?.name} Tests</h1>
            <p className="text-gray-700">Manage all your test data here.</p>
          </div>
          <ListContainer>
            {tests.map((test) => (
              <li key={`test-${test.id}`} className="flex gap-4 p-2 hover:bg-blue-300">
                <p>{test.name}</p>
                <Link href={`/tests/${test.id}`}>Do</Link>
              </li>
            ))}
          </ListContainer>
        </CardContainer>
      </AdminLayout>
    </Layout>
  );
}

TestHomePage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>
}

export default TestHomePage;