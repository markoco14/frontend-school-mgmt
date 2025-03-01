import { useUserContext } from "@/src/contexts/UserContext";
import Modal from "@/src/modules/core/components/Modal";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { useEffect, useState } from "react";
import { subjectAdapter } from "../../adapters/subjectAdapter";
import AddSubjectForm from "./AddSubjectForm";
import SubjectList from "./SubjectList";


export default function SubjectSection() {
  const { selectedSchool } = useUserContext();
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
    <section className="rounded border p-4 shadow">
      <article className="grid gap-4">
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
        />
      </article>
      {/* <Modal
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
      </Modal> */}
      <Modal show={isAddSubject} close={handleClose} title="Add New Subject">
        <AddSubjectForm setSubjects={setSubjects} />
      </Modal>
    </section>
  );
}
