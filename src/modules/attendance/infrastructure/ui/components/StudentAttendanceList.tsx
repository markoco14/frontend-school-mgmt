import Image from "next/image";
import { StudentAttendance } from "../../../domain/entities/StudentAttendance";
import AttendanceNoteButton from "./AttendanceNoteButton";
import AttendanceStatusButton from "./AttendanceStatusButton";

const StudentAttendanceList = ({
  classAttendance,
  setIsWriteNote,
  setSelectedAttendance,
  handleUpdateAttendance,
}: {
  classAttendance: StudentAttendance[];
  setIsWriteNote: Function;
  setSelectedAttendance: Function;
  handleUpdateAttendance: Function;
}) => {
  return (
    <ul className="grid divide-y">
      {classAttendance?.map((studentAttendance) => (
        <li
          key={`studentAttendance-${studentAttendance?.id}`}
          className="flex items-center justify-between py-1"
        >
          <div className="flex items-center gap-4">
            <div className="relative col-span-1 flex justify-center">
              <Image
                src={
                  studentAttendance.student
                    ? studentAttendance.student?.photo_url
                    : ""
                }
                alt={`An image of ${studentAttendance.student?.first_name}`}
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
            <span>
              {studentAttendance.student?.first_name}{" "}
              {studentAttendance.student?.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AttendanceNoteButton
              studentAttendance={studentAttendance}
              setIsWriteNote={setIsWriteNote}
              setSelectedAttendance={setSelectedAttendance}
            />
            <AttendanceStatusButton
              studentAttendance={studentAttendance}
              status={0}
              handleUpdateAttendance={handleUpdateAttendance}
            />
            <AttendanceStatusButton
              studentAttendance={studentAttendance}
              status={1}
              handleUpdateAttendance={handleUpdateAttendance}
            />
            <AttendanceStatusButton
              studentAttendance={studentAttendance}
              status={2}
              handleUpdateAttendance={handleUpdateAttendance}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentAttendanceList;
