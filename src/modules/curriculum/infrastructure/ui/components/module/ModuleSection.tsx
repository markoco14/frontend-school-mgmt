import { useUserContext } from "@/src/UserContext";
import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { useEffect, useState } from "react";
import { Level } from "../../../../domain/entities/Level";
import { Module } from "../../../../domain/entities/Module";
import { Subject } from "../../../../domain/entities/Subject";
import { SubjectLevel } from "../../../../domain/entities/SubjectLevel";
import { moduleAdapter } from "../../../adapters/moduleAdapter";
import AddModule from "./AddModule";

export default function ModuleSection({
  subjectLevels,
}: {
  subjectLevels: SubjectLevel[];
}) {
  const { selectedSchool } = useUserContext();
  const [isAddModule, setIsAddModule] = useState<boolean>(false);

  const [uniqueSubjects, setUniqueSubjects] = useState<Subject[]>([]);

  const [currentSubject, setCurrentSubject] = useState<Subject>();

  const [currentSubjectLevels, setCurrentSubjectLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<Level>();

  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    async function fetchModules({
      schoolId,
      subjectName,
      levelOrder,
    }: {
      schoolId?: number;
      subjectName: string;
      levelOrder: number;
    }) {
      if (selectedSchool) {
        await moduleAdapter
          .listSchoolModules({
            schoolId: schoolId,
            subjectName: subjectName,
            levelOrder: levelOrder,
          })
          .then((res) => setModules(res));
      }
    }

    const uniqueSubjects = subjectLevels.reduce(
      (subjects: Subject[], subjectLevel: SubjectLevel) => {
        if (
          !subjects.find(
            (subject: Subject) => subject.name === subjectLevel.subject.name,
          )
        ) {
          subjects.push(subjectLevel.subject);
        }
        return subjects;
      },
      [],
    );

    const defaultSubject = uniqueSubjects[0];
    setUniqueSubjects(uniqueSubjects);
    setCurrentSubject(defaultSubject);

    const filteredLevels = subjectLevels
      .filter(
        (subjectLevel) => subjectLevel.subject.name === uniqueSubjects[0]?.name,
      )
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);

    const defaultLevel = filteredLevels[0];
    setCurrentSubjectLevels(filteredLevels);
    setCurrentLevel(defaultLevel);

    fetchModules({
      schoolId: selectedSchool?.id,
      subjectName: defaultSubject?.name,
      levelOrder: defaultLevel?.order,
    });
  }, [subjectLevels, selectedSchool]);

  async function handleFetchModules({
    schoolId,
    subjectName,
    levelOrder,
  }: {
    schoolId?: number;
    subjectName: string;
    levelOrder: number;
  }) {
    if (selectedSchool) {
      await moduleAdapter
        .listSchoolModules({
          schoolId: schoolId,
          subjectName: subjectName,
          levelOrder: levelOrder,
        })
        .then((res) => {
          setModules(res);
        });
    }
  }

  function handleChangeSubjectLevelAndModules({
    subjectLevels,
    subject,
  }: {
    subjectLevels: SubjectLevel[];
    subject: Subject;
  }) {
    const filteredLevels = subjectLevels
      .filter((subjectLevel) => subjectLevel.subject.name === subject.name)
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);
    setCurrentSubject(subject);
    setCurrentSubjectLevels(filteredLevels);
    setCurrentLevel(filteredLevels[0]);
    selectedSchool &&
      handleFetchModules({
        schoolId: selectedSchool.id,
        subjectName: subject.name,
        levelOrder: filteredLevels[0].order,
      });
  }

  return (
    <section className="col-span-2">
      <div className="flex justify-between">
        <h2 className="mb-2 text-3xl">Modules</h2>
        <button
          className=""
          onClick={() => {
            setIsAddModule(!isAddModule);
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {!subjectLevels.length ? (
        <p>there are no levels connected to your subjects</p>
      ) : (
        <article className="grid grid-cols-4 gap-4">
          <section className="col-span-4 rounded border p-4 shadow xs:col-span-2 sm:col-span-1">
            <h3 className="text-xl">Subjects</h3>
            <ul className="mb-4 rounded bg-gray-100 shadow-inner">
              {uniqueSubjects?.map((subject: Subject, index) => (
                <li
                  key={index}
                  className={`${
                    subject.name === currentSubject?.name
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    // change subject & level when change subject
                    // because different subjects have different levels
                    // set to a consistent default value of [0]
                    handleChangeSubjectLevelAndModules({
                      subjectLevels: subjectLevels,
                      subject: subject,
                    });
                  }}
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="col-span-4 rounded border p-4 shadow xs:col-span-2 sm:col-span-1">
            <h3 className="text-xl">Levels</h3>
            <ul className="mb-4 rounded bg-gray-100 shadow-inner">
              {currentSubjectLevels?.map((level, index) => (
                <li
                  key={index}
                  className={`${
                    level.order === currentLevel?.order
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    setCurrentLevel(level);
                    currentSubject &&
                      handleFetchModules({
                        schoolId: selectedSchool?.id,
                        subjectName: currentSubject?.name,
                        levelOrder: level.order,
                      });
                  }}
                >
                  {level.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="col-span-4 rounded border p-4 shadow sm:col-span-2">
            <h3 className="text-xl">Modules</h3>
            {modules.length > 0 ? (
              <ul className="rounded bg-gray-100 shadow-inner">
                {modules.map((module, index) => (
                  <li key={index} className="p-2 hover:bg-gray-300">
                    Unit {module.order} {module.name}
                  </li>
                ))}
              </ul>
            ) : (
              <article className="rounded bg-gray-100 p-2 shadow-inner">
                <p>There are no modules in this level</p>
              </article>
            )}
          </section>
          {isAddModule && currentSubject && currentLevel && (
            <Modal
              show={isAddModule}
              close={setIsAddModule}
              title={`${currentSubject?.name} Level ${currentLevel?.order}`}
            >
              <AddModule
                modules={modules}
                setModules={setModules}
                currentSubject={currentSubject}
                currentLevel={currentLevel}
                subjectLevels={subjectLevels}
              />
            </Modal>
          )}
        </article>
      )}
    </section>
  );
}
