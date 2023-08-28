import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { Level } from "../../../domain/entities/Level";
import { Module } from "../../../domain/entities/Module";
import { moduleAdapter } from "../../adapters/moduleAdapter";

export default function ModuleSection({
  subjectLevels,
}: {
  subjectLevels: SubjectLevel[];
}) {
  const { selectedSchool } = useContext(AuthContext);

  const [uniqueSubjects, setUniqueSubjects] = useState<Subject[]>([]);

  const [currentSubject, setCurrentSubject] = useState<string>(
    subjectLevels.reduce((acc: Subject[], subjectLevel: SubjectLevel) => {
      if (
        !acc.find(
          (subject: Subject) => subject.name === subjectLevel.subject.name
        )
      ) {
        acc.push(subjectLevel.subject);
      }
      return acc;
    }, [])[0]?.name
  );

  const [currentSubjectLevels, setCurrentSubjectLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>();

  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    async function fetchModules({schoolId, currentSubject, currentLevel}: {schoolId: number, currentSubject: string, currentLevel: number}){
       if (selectedSchool) {
        await moduleAdapter
          .listSchoolModules({
            schoolId: schoolId,
            subjectName: currentSubject,
            levelOrder: currentLevel,
          })
          .then((res) => setModules(res));
      }
    }
    

    const uniqueSubjects = subjectLevels.reduce((acc: Subject[], subjectLevel: SubjectLevel) => {
      if (
        !acc.find(
          (subject: Subject) => subject.name === subjectLevel.subject.name
        )
      ) {
        acc.push(subjectLevel.subject);
      }
      return acc;
    }, [])

    const defaultSubject = uniqueSubjects[0]?.name
    setUniqueSubjects(uniqueSubjects);
    setCurrentSubject(defaultSubject)

    const filteredLevels =  subjectLevels
      .filter(
        (subjectLevel) => subjectLevel.subject.name === uniqueSubjects[0]?.name
      )
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order)

    const defaultLevel = filteredLevels[0]?.order
    setCurrentSubjectLevels(filteredLevels)
    setCurrentLevel(defaultLevel)

    fetchModules({schoolId: selectedSchool.id, currentSubject: defaultSubject, currentLevel: defaultLevel,})
  }, [subjectLevels, selectedSchool])

  async function handleFetchModules({
    schoolId,
    level,
    subject,
  }: {
    schoolId: number;
    level: number;
    subject: string;
  }) {
    if (selectedSchool) {
      await moduleAdapter
        .listSchoolModules({
          schoolId: schoolId,
          levelOrder: level,
          subjectName: subject,
        })
        .then((res) => setModules(res));
    }
  }

  function handleChangeLevel(
    subjectLevels: SubjectLevel[],
    subjectName: string
  ) {
    const filteredLevels = subjectLevels
      .filter((subjectLevel) => subjectLevel.subject.name === subjectName)
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);
    setCurrentSubject(subjectName);
    setCurrentSubjectLevels(filteredLevels);
    setCurrentLevel(filteredLevels[0].order);
  }

  return (
    <section className="col-span-2">
      <h2 className="text-3xl mb-2">Modules</h2>
      {!subjectLevels.length ? (
        <p>there are no levels connected to your subjects</p>
      ) : (
        <article className="grid grid-cols-4">
          <div className="col-span-4 xs:col-span-1">
            <h3 className="text-xl">Subjects</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
              {uniqueSubjects?.map((subject: Subject, index) => (
                <li
                  key={index}
                  className={`${
                    subject.name === currentSubject
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    handleChangeLevel(subjectLevels, subject.name);
                    handleFetchModules({
                      schoolId: selectedSchool.id,
                      subject: subject.name,
                      level: Number(currentLevel),
                    });
                  }}
                >
                  {subject.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 xs:col-span-1">
            <h3 className="text-xl">Levels</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
              {currentSubjectLevels?.map((level, index) => (
                <li
                  key={index}
                  className={`${
                    level.order === currentLevel
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    setCurrentLevel(level.order);
                    handleFetchModules({
                      schoolId: selectedSchool.id,
                      subject: currentSubject,
                      level: level.order,
                    });
                  }}
                >
                  {level.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 xs:col-span-2">
            <h3 className="text-xl">Modules</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
              {modules?.map((module, index) => (
                <li key={index} className="p-2 hover:bg-gray-300">
                  {module.name}
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </section>
  );
}
