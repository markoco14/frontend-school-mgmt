import AuthContext from "@/src/AuthContext";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/attendance/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceReasonForm from "@/src/modules/attendance/infrastructure/ui/components/AttendanceReasonForm";
import StudentAttendanceList from "@/src/modules/attendance/infrastructure/ui/components/StudentAttendanceList";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
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

    getAttendance();
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
      {/* 1) loading */}
      {loadingAttendance ? (
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
      )}
    </>
  );
};

export default AttendanceSection;
