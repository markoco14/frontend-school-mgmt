import AuthContext from "@/src/AuthContext";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/attendance/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceNoteButton from "@/src/modules/attendance/infrastructure/ui/components/AttendanceNoteButton";
import AttendanceReasonForm from "@/src/modules/attendance/infrastructure/ui/components/AttendanceReasonForm";
import AttendanceStatusButton from "@/src/modules/attendance/infrastructure/ui/components/AttendanceStatusButton";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { Student } from "@/src/modules/students/domain/entities/Student";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

const AttendanceSection = ({
  selectedClass,
  date,
}: {
  selectedClass: ClassEntity;
  date: Date;
}) => {
  const { user } = useContext(AuthContext);
  const [isWriteNote, setIsWriteNote] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [classAttendance, setClassAttendance] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  function handleClose() {
    setIsWriteNote(false);
    setSelectedStudent(undefined);
  }

  const handleUpdateAttendance = ({
    newAttendance,
  }: {
    newAttendance: StudentAttendance;
  }) => {
    const updatedAttendance = classAttendance.map((student: Student) => {
      // Find the attendance object that matches the ID of the newAttendance
      if (student.attendance_for_day?.id === newAttendance.id) {
        // Replace it with newAttendance
        student.attendance_for_day = newAttendance;
      }
      // Leave all other objects unchanged
      return student;
    });

    // Update the state
    setClassAttendance(updatedAttendance);
  };

  useEffect(() => {
    async function getAttendance() {
      setLoading(true);
      await studentAttendanceAdapter
        .listStudentsWithAttendance({
          classId: selectedClass?.id,
          date: date.toISOString().split("T")[0],
        })
        .then((res) => {
          setClassAttendance(res);
          setLoading(false);
        });
    }
    
    getAttendance();
  }, [setClassAttendance, date, selectedClass?.id]);

  // NEED A WAY TO STOP THE REQUEST WHEN NOT EXIST
  // function isSatOrSun({ date }: { date: Date }) {
  //   if (
  //     date.toDateString().split(" ")[0] === "Sat" ||
  //     date.toDateString().split(" ")[0] === "Sun"
  //   ) {
  //     return true;
  //   }
  // }

  // NEEDS REFACTOR FOR NEW STUDENT FIRST RESPONSE
  async function createAttendanceRecords({
    selectedClass,
    date,
  }: {
    selectedClass: ClassEntity;
    date: Date;
  }) {
    selectedClass.class_list &&
      user &&
      (await studentAttendanceAdapter
        .batchCreateAttendance({
          classId: selectedClass.id,
          classAttendance: classAttendance,
          date: date.toISOString().split("T")[0],
          userId: user?.user_id,
        })
        .then((res) => {
          setClassAttendance(res);
        }));
  }

  return (
    <>
      <h2 className="mb-4 text-2xl">
        Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
      </h2>
      <p className="mb-2">Track student attendance below.</p>
      {loading ? (
        <Skeleton>
          <StudentListSkeletonProps studentQuantity={8} />
        </Skeleton>
      ) : (
        <>
          <ul className="divide-y">
            {classAttendance?.map((student) => (
              <li key={student.id}>
                <div className="flex items-center justify-between p-1">
                  <div className="flex items-center gap-4">
                    <div className="relative col-span-1 flex justify-center">
                      <Image
                        src={student?.photo_url}
                        alt={`An image of ${student?.first_name}`}
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                        className="rounded-full"
                      />
                    </div>
                    <p>
                      {student.first_name}{" "}
                      {student.last_name}
                    </p>
                  </div>
                  {!student.attendance_for_day ? (
                    <div>
                      <button
                        className="rounded-lg text-blue-500"
                        onClick={() => {
                          createAttendanceRecords({
                            selectedClass: selectedClass,
                            date: date,
                          });
                        }}
                      >
                        Get Attendance
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AttendanceNoteButton
                        student={student}
                        setSelectedStudent={setSelectedStudent}
                        setIsWriteNote={setIsWriteNote}
                      />
                      <AttendanceStatusButton
                        student={student}
                        status={0}
                        handleUpdateAttendance={handleUpdateAttendance}
                        setIsWriteNote={setIsWriteNote}
                        setSelectedStudent={setSelectedStudent}
                      />
                      <AttendanceStatusButton
                        student={student}
                        status={1}
                        handleUpdateAttendance={handleUpdateAttendance}
                        setIsWriteNote={setIsWriteNote}
                        setSelectedStudent={setSelectedStudent}
                      />
                      <AttendanceStatusButton
                        student={student}
                        status={2}
                        handleUpdateAttendance={handleUpdateAttendance}
                        setIsWriteNote={setIsWriteNote}
                        setSelectedStudent={setSelectedStudent}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Modal
            show={isWriteNote}
            close={handleClose}
            title={"Student Attendance Reason"}
          >
            {selectedStudent && (
              <AttendanceReasonForm
                selectedStudent={selectedStudent}
                handleUpdateAttendance={handleUpdateAttendance}
                handleClose={handleClose}
              />
            )}
          </Modal>
        </>
      )}
    </>
  );
};

export default AttendanceSection;
