import AuthContext from "@/src/AuthContext";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { subjectAdapter } from "../../adapters/subjectAdapter";
import AddSubjectForm from "./AddSubjectForm";
import AddSubjectLevelForm from "./AddSubjectLevelForm";

const SubjectList = ({
  subjects,
  setSubjects,
  subjectLevels,
  setSubjectLevels,
}: {
  subjects: Subject[];
  setSubjects: Function;
  subjectLevels: SubjectLevel[];
  setSubjectLevels: Function;
}) => {
  const [currentSubject, setCurrentSubject] = useState<Subject>();
  const [isAddSubjectLevel, setIsAddSubjectLevel] = useState<boolean>(false);

  async function handleDeleteSubject({ subjectId }: { subjectId: number }) {
    await subjectAdapter.deleteSubject({ id: subjectId }).then((res) => {
      setSubjects(
        (prevSubjects: Subject[]) =>
          prevSubjects?.filter((subject) => subject.id !== subjectId),
      );
      setSubjectLevels((prevSubjectLevels: SubjectLevel[]) => {
        prevSubjectLevels.filter(
          (subjectLevel) => subjectLevel.subject.id !== subjectId,
        );
      });
      toast.success("Subject deleted.");
    });
  }

  function handleClose() {
    setIsAddSubjectLevel(false);
  }

  return (
    <>
      <ul className="rounded bg-gray-100 shadow-inner">
        {subjects?.map((subject, index) => (
          <li
            key={index}
            className="flex justify-between p-2 hover:bg-gray-300"
          >
            <button
              onClick={() => {
                setCurrentSubject(subject);
                setIsAddSubjectLevel(true);
              }}
            >
              {subject.name}
            </button>
            {/* <button
              onClick={() => handleDeleteSubject({ subjectId: subject.id })}
              className="text-red-500 hover:text-red-600"
            >
              delete
            </button> */}
          </li>
        ))}
      </ul>
      <Modal
        show={isAddSubjectLevel}
        close={handleClose}
        title={`Add levels to ${currentSubject?.name}`}
      >
        {currentSubject && (
          <AddSubjectLevelForm
            subject={currentSubject}
            subjectLevels={subjectLevels}
            setSubjectLevels={setSubjectLevels}
          />
        )}
      </Modal>
    </>
  );
};

export default function SubjectSection({
  subjectLevels,
  setSubjectLevels,
}: {
  subjectLevels: SubjectLevel[];
  setSubjectLevels: Function;
}) {
  const { selectedSchool } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isAddSubject, setIsAddSubject] = useState<boolean>(false);

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await subjectAdapter
          .list({ schoolId: selectedSchool.id })
          .then((res) => {
            setSubjects(res);
          });
      }
    }

    getSubjects();
  }, [selectedSchool]);

  function handleClose() {
    setIsAddSubject(false);
  }

  return (
    <section className="col-span-2 rounded border p-4 shadow xs:col-span-1">
      <article className="grid w-1/2 gap-4">
        <div className="flex justify-between">
          <h2 className="mb-2 text-3xl">Subjects</h2>
          <button
            className="rounded  underline underline-offset-2 hover:text-blue-700"
            onClick={() => setIsAddSubject(true)}
          >
            Add subject
          </button>
          {/* <AddSubject setSubjects={setSubjects} /> */}
        </div>
        <p>Click a subject to assign Levels.</p>
        <SubjectList
          subjects={subjects}
          setSubjects={setSubjects}
          subjectLevels={subjectLevels}
          setSubjectLevels={setSubjectLevels}
        />
      </article>
      <Modal show={isAddSubject} close={handleClose} title="Add New Subject">
        <AddSubjectForm setSubjects={setSubjects} />
      </Modal>
    </section>
  );
}
