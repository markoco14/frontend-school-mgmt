import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/src/modules/core/components/AdminLayout"
import Layout from "@/src/modules/core/components/Layout"
import Link from "next/link"
import ListContainer from "@/src/modules/core/components/ListContainer"
import { Test } from "@/src/modules/tests/entities/Test"

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
	return (
    <Layout>
      <AdminLayout>
        <div>
          <h1>Test List Page</h1>
          <ListContainer>
            {tests.map((test) => (
              <li key={`test-${test.id}`} className="flex gap-4">
                <p>{test.name}</p>
                <Link href={`/tests/${test.id}`}>Do</Link>
              </li>
            ))}
          </ListContainer>
        </div>
      </AdminLayout>
    </Layout>
  );
}

TestHomePage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>
}

export default TestHomePage;