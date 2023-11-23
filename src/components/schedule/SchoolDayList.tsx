import { useUserContext } from "@/src/UserContext";
import { schoolDayAdapter } from "@/src/modules/schedule/infrastructure/ui/adapters/schoolDayAdapter";
import { SchoolDay } from "@/src/modules/school-mgmt/domain/entities/SchoolDay";
import { removeListItem } from "@/src/utils/removeListItem";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
        removeListItem(setSchoolDays, schoolDayId);
        toast.success("School Day deleted.");
      });
  }

  return (
    <ul className="mb-4 rounded bg-gray-100 shadow-inner">
      {schoolDays.length > 0 ? (
        schoolDays.map((schoolDay, index) => (
          <li
            key={index}
            className="flex justify-between p-2 hover:bg-gray-300"
          >
            <span>{schoolDay?.day}</span>
            <button
              onClick={() =>
                handleDeleteSchoolDay({ schoolDayId: schoolDay.id })
              }
              className="text-red-500 hover:text-red-600"
            >
              delete
            </button>
          </li>
        ))
      ) : (
        <p className="p-2">No school days chosen.</p>
      )}
    </ul>
  );
};

export default SchoolDayList