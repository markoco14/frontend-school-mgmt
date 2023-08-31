import AuthContext from "@/src/AuthContext";
import Layout from "@/src/modules/core/infrastructure/ui/components/Layout";
import ReportAdminSetup from "@/src/modules/reports/infrastructure/ui/components/ReportAdminSetup";
import ReportTeacherDetails from "@/src/modules/reports/infrastructure/ui/components/ReportTeacherDetails";
import Link from "next/link";
import { useContext, useState } from "react";

export default function WriteReport() {
  const { user } = useContext(AuthContext);
  const [subject, setSubject] = useState<string>("Grammar");
  const [level, setLevel] = useState<number>(5);
  const [unit, setUnit] = useState<number>(1);
  const [day, setDay] = useState<string | number>(1);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(user?.role === "TEACHER" ? true : false);

  const date = new Date();

  return (
    <Layout>
      <div>
        <section>
          <div className="flex justify-between items-baseline mb-4">
            <h2>
              <span className="text-lg text-gray-500">
                {date.toDateString()}
              </span>{" "}
              <br></br>
            </h2>
            <Link
              href="/"
              className="hover:underline hover:underline-offset-2 hover:text-blue-700"
            >
              Back
            </Link>
          </div>
        </section>
        <section>
          {!isConfirmed ? (
            <>
              <h2 className="text-3xl mb-4">Level 9 Monday/Thursday (Andrew)</h2>
              <ReportAdminSetup
                subject={subject}
                setSubject={setSubject}
                level={level}
                setLevel={setLevel}
                unit={unit}
                setUnit={setUnit}
                day={day}
                setDay={setDay}
                setIsConfirmed={setIsConfirmed}
              />
            </>
          ) : (
						<>
							{user?.role !== 'TEACHER' && (
								<button className="mb-4 text-lg " onClick={() => setIsConfirmed(false)}>Edit Report Details</button>
							)}
							<ReportTeacherDetails setIsConfirmed={setIsConfirmed} />
						</>
          )}
        </section>
      </div>
    </Layout>
  );
}
