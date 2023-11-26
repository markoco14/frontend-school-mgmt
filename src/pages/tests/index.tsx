import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/src/modules/core/components/AdminLayout"
import Layout from "@/src/modules/core/components/Layout"
import Link from "next/link"
import ListContainer from "@/src/modules/core/components/ListContainer"

const tests = [
	{id: 1, name: "Test 1"},
	{id: 2, name: "Test 2"},
	{id: 3, name: "Test 3"},
	{id: 4, name: "Test 4"},
]

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