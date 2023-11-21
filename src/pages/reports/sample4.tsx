import Layout from "@/src/modules/core/components/Layout";
import New_ReportTeacherDetails from "@/src/modules/reports/infrastructure/ui/components/New_ReportTeacherDetails";
import Link from "next/link";
import { useState } from "react";

export default function WriteReport() {

  // eslint-disable-next-line no-unused-vars
  const [reportData, setReportData] = useState<any>();
  const date = new Date();

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2>
              <span className="text-lg text-gray-500">
                {date.toDateString()}
              </span>{" "}
              <br></br>
            </h2>
            <Link
              href="/"
              className="hover:text-blue-700 hover:underline hover:underline-offset-2"
            >
              Back
            </Link>
          </div>
        </section>
        <h2 className="mb-2 text-xl">Level 9 Monday/Thursday (Andrew)</h2>
        <New_ReportTeacherDetails
          reportData={reportData}
        />
      </div>
    </Layout>
  );
}
