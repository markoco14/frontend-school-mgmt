import { useUserContext } from "@/src/UserContext";
import Layout from "@/src/modules/core/components/Layout";
import ReportAdminSetup from "@/src/modules/reports/infrastructure/ui/components/ReportAdminSetup";
import ReportTeacherDetails from "@/src/modules/reports/infrastructure/ui/components/ReportTeacherDetails";
import Link from "next/link";
import { useState } from "react";

export default function WriteReport() {
  const { user } = useUserContext();
  const [reportData, setReportData] = useState<any>();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(
    user?.role === "TEACHER" ? true : false,
  );

  const date = new Date();

  return (
    <Layout>
      <div>
        <section>
          <div className="mb-4 flex items-baseline justify-between">
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

        <h2 className="mb-4 text-3xl">Level 9 Monday/Thursday (Andrew)</h2>
        {!isConfirmed ? (
          <ReportAdminSetup
            setReportData={setReportData}
            setIsConfirmed={setIsConfirmed}
          />
        ) : (
          <>
            {user?.role !== "TEACHER" && (
              <button
                className="mb-4 text-lg "
                onClick={() => setIsConfirmed(false)}
              >
                Edit Report Details
              </button>
            )}
            <ReportTeacherDetails
              reportData={reportData}
              setIsConfirmed={setIsConfirmed}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
