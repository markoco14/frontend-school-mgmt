import { SchoolDay } from "@/src/modules/school-mgmt/entities/SchoolDay";
import ListContainer from "../../core/components/ListContainer";

const SchoolDayList = ({
  schoolDays,
  handleDeleteSchoolDay,
}: {
  schoolDays: SchoolDay[];
  handleDeleteSchoolDay: Function;
}) => {
  return (
    <ListContainer>
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
    </ListContainer>
  );
};

export default SchoolDayList;
