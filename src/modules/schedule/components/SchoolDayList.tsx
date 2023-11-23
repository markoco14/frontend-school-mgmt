import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";

const SchoolDayList = ({
  schoolDays,
  handleDeleteSchoolDay,
}: {
  schoolDays: SchoolDay[];
  handleDeleteSchoolDay: Function;
}) => {
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

export default SchoolDayList;
