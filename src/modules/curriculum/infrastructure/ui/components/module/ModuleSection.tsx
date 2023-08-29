import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Level } from "../../../../domain/entities/Level";
import { Module } from "../../../../domain/entities/Module";
import { Subject } from "../../../../domain/entities/Subject";
import { SubjectLevel } from "../../../../domain/entities/SubjectLevel";
import { moduleAdapter } from "../../../adapters/moduleAdapter";
import AddModuleModal from "./AddModuleModal";


export default function ModuleSection({
  subjectLevels,
}: {
  subjectLevels: SubjectLevel[];
}) {
  const { selectedSchool } = useContext(AuthContext);
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
      schoolId: number;
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
            (subject: Subject) => subject.name === subjectLevel.subject.name
          )
        ) {
          subjects.push(subjectLevel.subject);
        }
        return subjects;
      },
      []
    );

    const defaultSubject = uniqueSubjects[0];
    setUniqueSubjects(uniqueSubjects);
    setCurrentSubject(defaultSubject);

    const filteredLevels = subjectLevels
      .filter(
        (subjectLevel) => subjectLevel.subject.name === uniqueSubjects[0]?.name
      )
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);

    const defaultLevel = filteredLevels[0];
    setCurrentSubjectLevels(filteredLevels);
    setCurrentLevel(defaultLevel);

    fetchModules({
      schoolId: selectedSchool.id,
      subjectName: defaultSubject?.name,
      levelOrder: defaultLevel?.order,
    });
  }, [subjectLevels, selectedSchool]);

  async function handleFetchModules({
    schoolId,
    subjectName,
    levelOrder,
  }: {
    schoolId: number;
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
        <h2 className="text-3xl mb-2">Modules</h2>
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
          <section className="border p-4 rounded shadow col-span-4 xs:col-span-2 sm:col-span-1">
            <h3 className="text-xl">Subjects</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
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
                    handleChangeSubjectLevelAndModules({subjectLevels: subjectLevels, subject: subject});
                  }}
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          </section>
          <section className="border p-4 rounded shadow col-span-4 xs:col-span-2 sm:col-span-1">
            <h3 className="text-xl">Levels</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
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
                        schoolId: selectedSchool.id,
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
          <section className="border p-4 rounded shadow col-span-4 sm:col-span-2">
            <h3 className="text-xl">Modules</h3>
            {modules.length > 0 ? (
              <ul className="bg-gray-100 rounded shadow-inner">
                {modules.map((module, index) => (
                  <li key={index} className="p-2 hover:bg-gray-300">
                    Unit {module.order} {module.name}
                  </li>
                ))}
              </ul>
            ) : (
              <article className="bg-gray-100 rounded shadow-inner p-2">
                <p>There are no modules in this level</p>
              </article>
            )}
          </section>
          {isAddModule && currentSubject && currentLevel && (
            <AddModuleModal
              modules={modules}
              setModules={setModules}
              currentSubject={currentSubject}
              currentLevel={currentLevel}
              subjectLevels={subjectLevels}
              isAddModule={isAddModule}
              setIsAddModule={setIsAddModule}
            />
          )}
        </article>
      )}
    </section>
  );
}
