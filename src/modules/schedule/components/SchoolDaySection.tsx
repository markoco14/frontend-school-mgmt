import { useUserContext } from "@/src/contexts/UserContext";
import { schoolDayAdapter } from "@/src/modules/schedule/adapters/schoolDayAdapter";
import SchoolDayList from "@/src/modules/schedule/components/SchoolDayList";
import AddSchoolDay from "@/src/modules/schools/components/AddSchoolDay";
import { SchoolDay } from "@/src/modules/schools/entities/SchoolDay";
import { removeListItemById } from "@/src/utils/removeListItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  async function handleDeleteSchoolDay({
    schoolDayId,
  }: {
    schoolDayId: number;
  }) {
    await schoolDayAdapter
      .deleteSchoolDay({ schoolDayId: schoolDayId })
      .then(() => {
        const filteredList = removeListItemById(schoolDays, schoolDayId);
        setSchoolDays(filteredList);
        toast.success("School Day deleted.");
      });
  }

  if (!selectedSchool) {
    return (
      <div>
        <p>You need to choose a school first</p>
        <Link href="/">Choose School</Link>
      </div>
    )
  }

  return (
    <section>
      <article>
        <h2 className="mb-2 text-3xl">School Days</h2>
        <SchoolDayList
          schoolDays={schoolDays}
          handleDeleteSchoolDay={handleDeleteSchoolDay}
        />
        <AddSchoolDay schoolDays={schoolDays} setSchoolDays={setSchoolDays} />
      </article>
    </section>
  );
}
