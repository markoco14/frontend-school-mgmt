import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import { studentAttendanceAdapter } from "@/src/modules/attendance/infrastructure/adapters/studentAttendanceAdapter";
import AttendanceReasonForm from "@/src/modules/attendance/infrastructure/ui/components/AttendanceReasonForm";
import StudentAttendanceList from "@/src/modules/attendance/infrastructure/ui/components/StudentAttendanceList";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { useEffect, useState } from "react";

const AttendanceSection = ({
  selectedClass,
  date,
}: {
  selectedClass: any;
  date: Date;
}) => {
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

  return (
    <>
      <div>
        <h2 className="mb-2 text-2xl">
          Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
        </h2>
        <p>Track student attendance below.</p>
      </div>
      {loadingAttendance ? (
        <Skeleton>
          <StudentListSkeletonProps studentQuantity={8} />
        </Skeleton>
      ) : (
        <StudentAttendanceList
          classAttendance={classAttendance}
          setIsWriteNote={setIsWriteNote}
          setSelectedAttendance={setSelectedAttendance}
          handleUpdateAttendance={handleUpdateAttendance}
        />
      )}
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
  );
};

export default AttendanceSection;
