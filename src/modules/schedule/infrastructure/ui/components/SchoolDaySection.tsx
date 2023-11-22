import { useUserContext } from "@/src/UserContext";
import { SchoolDay } from "@/src/modules/school-mgmt/domain/entities/SchoolDay";
import AddSchoolDay from "@/src/modules/school-mgmt/infrastructure/ui/components/AddSchoolDay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { schoolDayAdapter } from "../adapters/schoolDayAdapter";
import { removeListItem } from "@/src/utils/removeListItem";

const SchoolDayList = ({
  schoolDays,
  setSchoolDays,
}: {
  schoolDays: SchoolDay[];
  setSchoolDays: Function;
}) => {
  const { selectedSchool } = useUserContext();

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await schoolDayAdapter
          .listSchoolSchoolDays({ schoolId: selectedSchool.id })
          .then((res) => {
            setSchoolDays(res);
          });
      }
    }

    getSubjects();
  }, [selectedSchool, setSchoolDays]);

  async function handleDeleteSchoolDay({
    schoolDayId,
  }: {
    schoolDayId: number;
  }) {
    await schoolDayAdapter
      .deleteSchoolDay({ schoolDayId: schoolDayId })
      .then(() => {
        removeListItem(setSchoolDays, schoolDayId)
        toast.success("School Day deleted.");
      });
  }

  return (
    <ul className="mb-4 rounded bg-gray-100 shadow-inner">
      {schoolDays?.map((schoolDay, index) => (
        <li key={index} className="flex justify-between p-2 hover:bg-gray-300">
          <span>{schoolDay?.day}</span>
          <button
            onClick={() => handleDeleteSchoolDay({ schoolDayId: schoolDay.id })}
            className="text-red-500 hover:text-red-600"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

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
