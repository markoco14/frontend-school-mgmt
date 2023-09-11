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
  selectedClass: any;
  date: Date;
}) => {
  const { user } = useContext(AuthContext);
  const [isWriteNote, setIsWriteNote] = useState<boolean>(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<StudentAttendance>();
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(false);
  const [classAttendance, setClassAttendance] = useState<StudentAttendance[]>(
    [],
  );
  const [classAttendance2, setClassAttendance2] = useState<Student[]>([]);
  function handleClose() {
    setIsWriteNote(false);
    setSelectedAttendance(undefined);
  }

  const handleUpdateAttendance = ({
    newAttendance,
  }: {
    newAttendance: StudentAttendance;
  }) => {
    // Use map to create a new array
    const updatedAttendance = classAttendance.map(
      (attendance: StudentAttendance) => {
        // Find the attendance object that matches the ID of the newAttendance
        if (attendance.id === newAttendance.id) {
          // Replace it with newAttendance
          return newAttendance;
        }
        // Leave all other objects unchanged
        return attendance;
      },
    );

    // Update the state
    setClassAttendance(updatedAttendance);
  };
  const handleUpdateAttendance2 = ({
    newAttendance,
  }: {
    newAttendance: StudentAttendance;
  }) => {
    console.log(newAttendance);
    // return
    // Use map to create a new array
    const updatedAttendance = classAttendance2.map((student: Student) => {
      // Find the attendance object that matches the ID of the newAttendance
      if (student.attendance_for_day?.id === newAttendance.id) {
        // Replace it with newAttendance
        student.attendance_for_day = newAttendance;
      }
      // Leave all other objects unchanged
      return student;
    });

    // Update the state
    setClassAttendance2(updatedAttendance);
  };

  async function getAttendanceList({
    school_class,
    date,
  }: {
    school_class: number | undefined;
    date: string | undefined;
  }) {
    setLoadingAttendance(true);
    await studentAttendanceAdapter
      .list({ school_class: school_class, date: date, details: true })
      .then((res) => {
        setClassAttendance(res);
        setLoadingAttendance(false);
      });
  }

  useEffect(() => {
    async function getAttendance() {
      setLoadingAttendance(true);
      await studentAttendanceAdapter
        .list({
          school_class: selectedClass?.id,
          date: date.toISOString().split("T")[0],
          details: true,
        })
        .then((res) => {
          setClassAttendance(res);
          setLoadingAttendance(false);
        });
    }
    async function getAttendance2() {
      setLoadingAttendance(true);
      await studentAttendanceAdapter
        .listStudentsWithAttendance({
          // school_class: selectedClass?.id,
          classId: selectedClass?.id,
          date: date.toISOString().split("T")[0],
          // details: true,
        })
        .then((res) => {
          console.log(res);
          setClassAttendance2(res);
          setLoadingAttendance(false);
        });
    }

    getAttendance();
    getAttendance2();
  }, [setClassAttendance, date, selectedClass?.id]);

  function isSatOrSun({ date }: { date: Date }) {
    if (
      date.toDateString().split(" ")[0] === "Sat" ||
      date.toDateString().split(" ")[0] === "Sun"
    ) {
      return true;
    }
  }

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
          classList: selectedClass.class_list,
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
      {/* 1) loading */}
      {loadingAttendance ? (
        <Skeleton>
          <StudentListSkeletonProps studentQuantity={8} />
        </Skeleton>
      ) : (
        <>
          <ul className="divide-y">
            {classAttendance2?.map((student) => (
              <li key={student.id}>
                <div className="flex justify-between p-1">
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
                    <p>{student.first_name}</p>
                  </div>
                  {!student.attendance_for_day ? (
                    <p>No attendance, sorry!</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AttendanceNoteButton
                        studentAttendance={student.attendance_for_day}
                        setIsWriteNote={setIsWriteNote}
                        setSelectedAttendance={setSelectedAttendance}
                      />
                      <AttendanceStatusButton
                        studentAttendance={student.attendance_for_day}
                        status={0}
                        handleUpdateAttendance={handleUpdateAttendance2}
                      />
                      <AttendanceStatusButton
                        studentAttendance={student.attendance_for_day}
                        status={1}
                        handleUpdateAttendance={handleUpdateAttendance2}
                      />
                      <AttendanceStatusButton
                        studentAttendance={student.attendance_for_day}
                        status={2}
                        handleUpdateAttendance={handleUpdateAttendance2}
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
            {selectedAttendance && (
              <AttendanceReasonForm
                selectedAttendance={selectedAttendance}
                handleUpdateAttendance={handleUpdateAttendance}
              />
            )}
          </Modal>
        </>
      )}
      {/* {loadingAttendance ? (
        <Skeleton>
          <StudentListSkeletonProps studentQuantity={8} />
        </Skeleton>
      ) : !selectedClass ? (
        <p>No classes selected</p>
      ) : !selectedClass.class_list.length ? (
        <p>No students in class. Go add some!</p>
      ) : !classAttendance.length ? (
        <div>
          <h2 className="mb-4 text-2xl">Attendance not ready</h2>
          <button
            className="rounded-lg bg-blue-700 p-2 text-white"
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
        <>
          <h2 className="mb-4 text-2xl">
            Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
          </h2>
          <p className="mb-2">Track student attendance below.</p>

          <StudentAttendanceList
            classAttendance={classAttendance}
            setIsWriteNote={setIsWriteNote}
            setSelectedAttendance={setSelectedAttendance}
            handleUpdateAttendance={handleUpdateAttendance}
          />
          <Modal
            show={isWriteNote}
            close={handleClose}
            title={"Student Attendance Reason"}
          >
            {selectedAttendance && (
              <AttendanceReasonForm
                selectedAttendance={selectedAttendance}
                handleUpdateAttendance={handleUpdateAttendance}
              />
            )}
          </Modal>
        </>
      )} */}
    </>
  );
};

export default AttendanceSection;
