import { useUserContext } from "@/src/UserContext";
import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";
import AddSchoolDay from "@/src/modules/school-mgmt/infrastructure/ui/components/AddSchoolDay";
import { useEffect, useState } from "react";
import { schoolDayAdapter } from "../adapters/schoolDayAdapter";
import SchoolDayList from "@/src/components/schedule/SchoolDayList";



export default function SchoolDaySection() {
  const { selectedSchool } = useUserContext();
  const [schoolDays, setSchoolDays] = useState<SchoolDay[]>([]);

  useEffect(() => {
    async function getSchoolDays() {
      if (selectedSchool) {
        await schoolDayAdapter
          .listSchoolSchoolDays({ schoolId: selectedSchool.id })
          .then((res) => {
            setSchoolDays(res);
          });
      }
    }
    getSchoolDays();
  }, [selectedSchool]);

  return (
    <section>
      <article>
        <h2 className="mb-2 text-3xl">School Days</h2>
        <SchoolDayList schoolDays={schoolDays} setSchoolDays={setSchoolDays} />
        <AddSchoolDay schoolDays={schoolDays} setSchoolDays={setSchoolDays} />
      </article>
    </section>
  );
}
