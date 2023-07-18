import Link from "next/link";
import Layout from "../../modules/core/infrastructure/ui/components/Layout";
import SchoolHeader from "@/src/modules/core/infrastructure/ui/components/SchoolHeader";


export default function SchoolHome() {

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Easy Cram School Management In The Cloud.</h1>
        <section className="bg-white p-4 rounded-lg">
          <SchoolHeader />
          <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/student-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Students
                </Link>
              <Link 
                href="/class-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Classes
                </Link>
              <Link 
                href="/report-mgmt/" 
                className='col-span-1 flex justify-center hover:bg-blue-300 p-4 rounded'
              >
                  Reports
                </Link>
            </div>
        </section>
      </div>
    </Layout>
  );
}