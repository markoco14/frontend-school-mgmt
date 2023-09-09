import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import New_ReportTeacherDetails from "@/src/modules/reports/infrastructure/ui/components/New_ReportTeacherDetails";
import ReportAdminSetup from "@/src/modules/reports/infrastructure/ui/components/ReportAdminSetup";
import ReportTeacherDetails from "@/src/modules/reports/infrastructure/ui/components/ReportTeacherDetails";
import Link from "next/link";
import { useContext, useState } from "react";

export default function WriteReport() {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState<any>();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(
    user?.role === "TEACHER" ? true : false,
  );

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
					setIsConfirmed={setIsConfirmed}
				/>
      </div>
    </Layout>
  );
}
