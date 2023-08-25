import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { subjectAdapter } from "../../adapters/subjectAdapter";
import { Subject } from "../../../domain/entities/Subject";
import AddSubject from "./AddSubject";
import { levelAdapter } from "../../adapters/levelAdapter";
import { Level } from "../../../domain/entities/Level";
import PaginationButtons from "@/src/modules/core/infrastructure/ui/components/PaginationButtons";
import { subjectLevelAdapter } from "../../adapters/subjectLevelAdapter";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";

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

  useEffect(() => {
    async function listSchoolLevels(id: number) {
      setLoading(true);
      await levelAdapter
        .listSchoolLevels({ id: id, page: page })
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
      try {
        listSchoolLevels(selectedSchool.id);
      } catch (error) {
        console.error(error);
      }
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

	function checkLevelAssigned({level, subject, subjectLevels}: {level: Level, subject: Subject; subjectLevels: SubjectLevel[]}) {
		return subjectLevels?.some((subjectLevel: SubjectLevel) => {
			console.log(`found match at level ${level.name}`, subjectLevel.level.id === level.id && subjectLevel.subject.id === subject.id)
			return subjectLevel.level.id === level.id && subjectLevel.subject.id === subject.id
		});
	}

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg text-gray-500">Manage Subject Levels</h1>
        <button onClick={() => setCurrentSubject("")}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <p className="text-2xl">Add levels to {subject.name}</p>
      <ul className="bg-gray-100 rounded shadow-inner mb-4">
        {loading ? (
          <p>loading...</p>
        ) : levels?.length >= 1 ? (
          levels?.map((level, index) => (
            <li
              key={index}
              className={`${checkLevelAssigned({level: level, subject: subject, subjectLevels: subjectLevels}) ? 'bg-blue-300 hover:bg-blue-500 ' : 'hover:bg-gray-300 '} p-2 flex justify-between`}
              onClick={() => {
                handleAddSubjectLevel({ subject: subject, level: level });
              }}
            >
              <span>{level.name}</span>
            </li>
          ))
        ) : (
          <article className="bg-gray-100 rounded shadow-inner mb-4">
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
	subjectLevels: SubjectLevel[]
  setSubjectLevels: Function;
}) => {
  const { selectedSchool } = useContext(AuthContext);
  const [currentSubject, setCurrentSubject] = useState<Subject>();

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await subjectAdapter
          .listSchoolSubjects({ schoolId: selectedSchool.id })
          .then((res) => {
            setSubjects(res.results);
          });
      }
    }

    getSubjects();
  }, [selectedSchool, setSubjects]);

  async function handleDeleteSubject({ subjectId }: { subjectId: number }) {
    await subjectAdapter.deleteSubject({ id: subjectId }).then((res) => {
      setSubjects((prevSubjects: Subject[]) =>
        prevSubjects?.filter((subject) => subject.id !== subjectId)
      );
      setSubjectLevels((prevSubjectLevels: SubjectLevel[]) =>
        prevSubjectLevels.filter(
          (subjectLevel) => subjectLevel.subject.id !== subjectId
        )
      );
      toast.success("Subject deleted.");
    });
  }

  return (
    <>
      <ul className="bg-gray-100 rounded shadow-inner mb-4">
        {subjects?.map((subject, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-300 flex justify-between"
            onClick={() => setCurrentSubject(subject)}
          >
            <span>{subject.name}</span>
            <button
              onClick={() => handleDeleteSubject({ subjectId: subject.id })}
              className="text-red-500 hover:text-red-600"
            >
              delete
            </button>
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
	subjectLevels: SubjectLevel[]
  setSubjectLevels: Function;
}) {
  const { selectedSchool } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    async function getSubjects() {
      if (selectedSchool) {
        await subjectAdapter
          .listSchoolSubjects({ schoolId: selectedSchool.id })
          .then((res) => {
            setSubjects(res.results);
          });
      }
    }

    getSubjects();
  }, [selectedSchool]);

  return (
    <section className="col-span-2 xs:col-span-1">
      <article>
        <div className="mb-2">
          <h2 className="text-3xl mb-2">Subjects</h2>
          <p>Click a subject to assign Levels.</p>
        </div>
        <SubjectList
          subjects={subjects}
          setSubjects={setSubjects}
					subjectLevels={subjectLevels}
          setSubjectLevels={setSubjectLevels}
        />
        <AddSubject setSubjects={setSubjects} />
      </article>
    </section>
  );
}
