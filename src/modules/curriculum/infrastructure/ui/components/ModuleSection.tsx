import AuthContext from "@/src/AuthContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { Level } from "../../../domain/entities/Level";
import { Module } from "../../../domain/entities/Module";
import { moduleAdapter } from "../../adapters/moduleAdapter";
import { Dialog, Transition } from "@headlessui/react";

const AddModule = ({
  currentSubject,
  currentLevel,
  isAddModule,
  setIsAddModule,
}: {
  currentSubject: Subject;
  currentLevel: Level;
  isAddModule: boolean;
  setIsAddModule: Function;
}) => {
  return (
    <Transition appear={true} show={isAddModule}>
      <Dialog
        onClose={() => setIsAddModule(false)}
        className="fixed inset-0 flex items-center justify-center"
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
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
            <Dialog.Title>Create New Module</Dialog.Title>
            <p>You are creating a new Module for {currentSubject?.name} Level {currentLevel?.order} </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddModule(false)}
                className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

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
      currentSubject,
      currentLevel,
    }: {
      schoolId: number;
      currentSubject: string;
      currentLevel: number;
    }) {
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

    const uniqueSubjects = subjectLevels.reduce(
      (acc: Subject[], subjectLevel: SubjectLevel) => {
        if (
          !acc.find(
            (subject: Subject) => subject.name === subjectLevel.subject.name
          )
        ) {
          acc.push(subjectLevel.subject);
        }
        return acc;
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
      currentSubject: defaultSubject?.name,
      currentLevel: defaultLevel?.order,
    });
  }, [subjectLevels, selectedSchool]);

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
    subject: Subject
  ) {
    const filteredLevels = subjectLevels
      .filter((subjectLevel) => subjectLevel.subject.name === subject.name)
      .map((subjectLevel) => subjectLevel.level)
      .sort((a, b) => a.order - b.order);
    setCurrentSubject(subject);
    setCurrentSubjectLevels(filteredLevels);
    setCurrentLevel(filteredLevels[0]);
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
                    subject.name === currentSubject?.name
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    // change level when change subject
                    // because different subjects have different levels
                    // set to a consistent default value of [0]
                    handleChangeLevel(subjectLevels, subject);
                    currentLevel && handleFetchModules({
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
                    level.order === currentLevel?.order
                      ? "bg-blue-300 hover:bg-blue-500"
                      : "bg-white hover:bg-gray-300"
                  } p-2 hover:cursor-pointer`}
                  onClick={() => {
                    setCurrentLevel(level);
                    currentSubject && handleFetchModules({
                      schoolId: selectedSchool.id,
                      subject: currentSubject?.name,
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
            <div className="flex justify-between">
              <h3 className="text-xl">Modules</h3>
              <button
                className=""
                onClick={() => {
                  setIsAddModule(!isAddModule);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
              {modules?.map((module, index) => (
                <li key={index} className="p-2 hover:bg-gray-300">
                  {module.name}
                </li>
              ))}
            </ul>
          </div>
          {isAddModule && currentSubject && currentLevel && (
            <AddModule
              currentSubject={currentSubject}
              currentLevel={currentLevel}
              isAddModule={isAddModule}
              setIsAddModule={setIsAddModule}
            />
          )}
        </article>
      )}
    </section>
  );
}
