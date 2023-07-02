import Link from 'next/link';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';

export default function StudentsHome() {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Sign up your students and manage their info.</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className='mb-4'>
            <h2 className='text-3xl mb-4'>Students</h2>
            <p>Add students and edit their information here.</p>
          </div>
          <article className='grid grid-cols-2 gap-4'>
            <Link 
              href="/student-mgmt/add"
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Add Students
            </Link>
            <Link 
              href="/student-mgmt/students"
              className='col-span-1 text-center hover:bg-blue-300 p-4 rounded'
            >
              Edit Profiles
            </Link>
          </article>
        </section>
      </div>
    </Layout>
  )
}
