import Link from 'next/link';
import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';

export default function ReportsHome() {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          <p>content goes here</p>
        </section>
      </div>
    </Layout>
  )
}
