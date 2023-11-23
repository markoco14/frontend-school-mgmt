import { useUserContext } from "@/src/contexts/UserContext";
import { schoolDayAdapter } from "@/src/modules/schedule/adapters/schoolDayAdapter";
import SchoolDayList from "@/src/modules/schedule/components/SchoolDayList";
import AddSchoolDay from "@/src/modules/school-mgmt/components/AddSchoolDay";
import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";
import { useEffect, useState } from "react";

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
