import Modal from "@/src/modules/core/components/Modal";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import listSubjects from "../requests/listSubjects";
import AddSubjectForm from "./AddSubjectForm";
import SubjectList from "./SubjectList";

export default function SubjectSection() {
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isAddSubject, setIsAddSubject] = useState<boolean>(false);
  const router = useRouter();
  const schoolSlug = router.query.school as string

  useEffect(() => {
    async function getSubjects() {
      try {
        setLoading(true)
        const subjects = await listSubjects(schoolSlug)
        setSubjects(subjects)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Unable to fetch subjects. Please try again.")
        }
      } finally {
        setLoading(false)
      }

    }

    getSubjects();
  }, [schoolSlug]);

  function handleClose() {
    setIsAddSubject(false);
  }

  if (loading) {
    return (
      <p>loading</p>
    );
  }

  return (
    <section className="rounded border p-4 shadow">
      <article className="grid gap-4">
        <div className="flex justify-between">
          <h2 className="mb-2 text-3xl">Subjects</h2>
          <button
            className="rounded hover:text-blue-700"
            onClick={() => setIsAddSubject(true)}
          >
            New Subject
          </button>
          {/* <AddSubject setSubjects={setSubjects} /> */}
        </div>
        <p>Click a subject to assign Levels.</p>
        <SubjectList
          subjects={subjects}
        />
      </article>
      <Modal show={isAddSubject} close={handleClose} title="Add New Subject">
        <AddSubjectForm setSubjects={setSubjects} />
      </Modal>
    </section>
  );
}
