import AuthContext from "@/src/AuthContext";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import PaginationButtons from "@/src/modules/core/infrastructure/ui/components/PaginationButtons";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Level } from "../../../domain/entities/Level";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { levelAdapter } from "../../adapters/levelAdapter";
import { subjectAdapter } from "../../adapters/subjectAdapter";
import { subjectLevelAdapter } from "../../adapters/subjectLevelAdapter";
import AddSubjectForm from "./AddSubjectForm";

const SubjectLevelModal = ({
  subject,
  setCurrentSubject,
  subjectLevels,
  setSubjectLevels,
}: {
  subject: Subject;
  setCurrentSubject: Function;
  subjectLevels: SubjectLevel[];
  setSubjectLevels: Function;
}) => {
  const { selectedSchool } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [page, setPage] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [show, setShow] = useState<boolean>(() =>
    subject.name === "" ? false : true,
  );

  useEffect(() => {
    async function listSchoolLevels() {
      setLoading(true);
      await levelAdapter
        .paginatedList({ school_id: selectedSchool?.id, page: page })
        .then((res) => {
          if (res.next) {
            setNext(true);
          } else {
            setNext(false);
          }
          setLevels(res.results);
          setCount(res.count);
          setLoading(false);
        });
    }

    if (selectedSchool) {
      listSchoolLevels();
    }
  }, [selectedSchool, page]);

  async function handleAddSubjectLevel({
    subject,
    level,
  }: {
    subject: Subject;
    level: Level;
  }) {
    try {
      await subjectLevelAdapter
        .addSubjectLevel({ subject: subject.id, level: level.id })
        .then((res) => {
          setSubjectLevels((prevSubjectLevels: SubjectLevel[]) => [
            ...prevSubjectLevels,
            res,
          ]);
          toast.success(`Added level ${level.name} to ${subject.name}`);
        });
    } catch (err) {
      console.error(err);
    }
  }

  function checkLevelAssigned({
    level,
    subject,
    subjectLevels,
  }: {
    level: Level;
    subject: Subject;
    subjectLevels: SubjectLevel[];
  }) {
    return subjectLevels?.some((subjectLevel: SubjectLevel) => {
      return (
        subjectLevel.level.id === level.id &&
        subjectLevel.subject.id === subject.id
      );
    });
  }

  return (
    <>
      <Transition appear={true} show={show}>
        <Dialog
          onClose={() => setCurrentSubject(false)}
          className="fixed inset-0 grid place-items-center "
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-900 bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity transition-scale ease-in duration-500"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition-opacity transition-scale ease-out duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="z-10 rounded-2xl bg-white p-8 shadow-xl">
              <div className="flex justify-between">
                <h1 className="text-lg text-gray-500">Manage Subject Levels</h1>
                <button onClick={() => setCurrentSubject("")}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <p className="text-2xl">Add levels to {subject.name}</p>
              <ul className="mb-4 rounded bg-gray-100 shadow-inner">
                {loading ? (
                  <p>loading...</p>
                ) : levels?.length >= 1 ? (
                  levels?.map((level, index) => (
                    <li key={index}>
                      <button
                        disabled={checkLevelAssigned({
                          level: level,
                          subject: subject,
                          subjectLevels: subjectLevels,
                        })}
                        onClick={() => {
                          handleAddSubjectLevel({
                            subject: subject,
                            level: level,
                          });
                        }}
                        className={`${
                          checkLevelAssigned({
                            level: level,
                            subject: subject,
                            subjectLevels: subjectLevels,
                          })
                            ? "bg-blue-300 hover:bg-blue-500"
                            : "hover:bg-gray-300 "
                        } flex w-full justify-between p-2 disabled:cursor-not-allowed`}
                      >
                        {level.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <article className="mb-4 rounded bg-gray-100 shadow-inner">
                    <p>This page is empty.</p>
                  </article>
                )}
              </ul>
              <PaginationButtons
                count={count}
                page={page}
                setPage={setPage}
                next={next}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentSubject(false)}
                  className="rounded bg-gray-300 px-4 py-1 text-gray-900 hover:bg-gray-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

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

  return (
    <>
      <ul className="rounded bg-gray-100 shadow-inner">
        {subjects?.map((subject, index) => (
          <li
            key={index}
            className="flex justify-between p-2 hover:bg-gray-300"
            // onClick={() => setCurrentSubject(subject)}
          >
            <button onClick={() => setCurrentSubject(subject)}>
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
      {currentSubject && (
        <SubjectLevelModal
          subject={currentSubject}
          setCurrentSubject={setCurrentSubject}
          subjectLevels={subjectLevels}
          setSubjectLevels={setSubjectLevels}
        />
      )}
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
