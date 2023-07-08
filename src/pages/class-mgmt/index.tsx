import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";

export default function ClassHome() {

  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Create classes here</h1>
        <section className="bg-white p-4 rounded-lg">
          <h2>Class time!</h2>
        </section>
      </div>
    </Layout>
  );
}
