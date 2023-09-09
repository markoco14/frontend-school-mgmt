import toast from "react-hot-toast";

const SetStudentButtons = ({
  students,
  selectedStudent,
  setSelectedStudent,
}: {
  students: any[];
  selectedStudent: any;
  setSelectedStudent: Function;
}) => {
	 const currentIndex = students.findIndex((s) => s === selectedStudent);

  const selectNext = () => {
    if (currentIndex < students.length - 1) {
      setSelectedStudent(students[currentIndex + 1]);
    }
  };

  const selectPrevious = () => {
    if (currentIndex > 0) {
      setSelectedStudent(students[currentIndex - 1]);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        disabled={currentIndex === 0}
        onClick={selectPrevious}
        className="grid w-24 place-items-center rounded border border-blue-500 hover:bg-blue-300 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-300 disabled:hover:bg-gray-400 sm:w-32"
      >
        {students[currentIndex - 1]?.first_name ? (
          students[currentIndex - 1]?.first_name
        ) : (
          <i className="fa-solid fa-xmark"></i>
        )}
      </button>
      <button
        onClick={() => {
          toast.success(`${selectedStudent?.first_name}'s report saved!`);
          if (currentIndex + 1 !== students.length) {
            setSelectedStudent(students[currentIndex + 1]);
          }
        }}
        className="w-24 rounded bg-blue-500 px-2 py-1 text-white shadow hover:bg-blue-600 disabled:bg-gray-300 sm:w-32 "
      >
        Save
      </button>
      <button
        disabled={currentIndex + 1 === students.length}
        onClick={selectNext}
        className="grid w-24 place-items-center rounded border border-blue-500 hover:bg-blue-300 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-300 disabled:hover:bg-gray-400 sm:w-32"
      >
        {students[currentIndex + 1]?.first_name ? (
          students[currentIndex + 1]?.first_name
        ) : (
          <i className="fa-solid fa-xmark items-center"></i>
        )}
      </button>
    </div>
  );
}

export default SetStudentButtons;