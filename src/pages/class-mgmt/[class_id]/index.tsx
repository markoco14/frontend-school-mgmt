import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import Link from "next/link";


export default function ClassList() {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className='text-3xl'>Class time!</h2>
            <Link href="/class-mgmt">Back</Link>
          </div>
          <p>Student list goes here</p>
        </section>
      </div>
    </Layout>
  );
}
