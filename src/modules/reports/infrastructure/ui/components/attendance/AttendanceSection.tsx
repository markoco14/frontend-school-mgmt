import ClassListSkeletonProps from "@/src/components/ui/skeleton/ClassListSkeletonProps";
import { Skeleton } from "@/src/components/ui/skeleton/Skeleton";
import StudentListSkeletonProps from "@/src/components/ui/skeleton/StudentListSkeletonProps";
import { StudentAttendance } from "@/src/modules/attendance/domain/entities/StudentAttendance";
import AttendanceReasonForm from "@/src/modules/attendance/infrastructure/ui/components/AttendanceReasonForm";
import ClassList from "@/src/modules/attendance/infrastructure/ui/components/ClassList";
import StudentAttendanceList from "@/src/modules/attendance/infrastructure/ui/components/StudentAttendanceList";
import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { useEffect } from "react";

const AttendanceSection = ({
	selectedClass,
	loading,
	loadingAttendance,
  classAttendance,
	setIsWriteNote,
	setSelectedAttendance,
	isWriteNote,
	handleClose,
	selectedAttendance,
	setClassAttendance,
	handleUpdateAttendance,
}: {
	selectedClass: any;
	loading: any;
	loadingAttendance: any;
  classAttendance: any;
	setIsWriteNote: any;
	setSelectedAttendance: any;
	isWriteNote: any;
	handleClose: any;
	selectedAttendance: any;
	setClassAttendance: any;
	handleUpdateAttendance: any;
}) => {
	

	useEffect(() => {

	}, [])
  return (
    <>
     
      <article className="col-span-4 grid gap-4 rounded border bg-white p-4 shadow">
        <div>
          <h2 className="mb-2 text-2xl">
            Class: {selectedClass?.name} Teacher {selectedClass?.teacher}
          </h2>
          <p>Track student attendance below.</p>
        </div>
        {loading || loadingAttendance ? (
          <Skeleton>
            <StudentListSkeletonProps studentQuantity={4} />
          </Skeleton>
        ) : (
          <StudentAttendanceList
            classAttendance={classAttendance}
            setIsWriteNote={setIsWriteNote}
            setSelectedAttendance={setSelectedAttendance}
            handleUpdateAttendance={handleUpdateAttendance}
          />
        )}
      </article>
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
