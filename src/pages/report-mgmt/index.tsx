import Layout from '@/src/modules/core/infrastructure/ui/components/Layout';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { reportAdapter } from '@/src/modules/report-mgmt/infrastructure/adapters/reportAdapter';
import { Report } from '@/src/modules/report-mgmt/domain/entities/Report';

export const getServerSideProps: GetServerSideProps<{
  reports: Report[];
}> = async () => {
  const reports = await reportAdapter.getReportsAll();

  return { props: { reports } };
};

export default function ReportsHome({
  reports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div>
        <h1 className="mb-4 p-4">Write daily reports here.</h1>
        <section className="bg-white p-4 rounded-lg">
          {reports?.map((report: Report, index: number) => (
            <p key={index}>{report.content} {report.is_complete ? "Complete" : "WIP"}</p>
          ))}
        </section>
      </div>
    </Layout>
  )
}
