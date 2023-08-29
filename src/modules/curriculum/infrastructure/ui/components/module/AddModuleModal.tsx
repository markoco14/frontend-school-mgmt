import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Level } from "../../../../domain/entities/Level";
import { Module } from "../../../../domain/entities/Module";
import { Subject } from "../../../../domain/entities/Subject";
import { SubjectLevel } from "../../../../domain/entities/SubjectLevel";
import AddModuleForm from "./AddModuleForm";

export default function AddModuleModal ({
  modules,
  setModules,
  currentSubject,
  currentLevel,
  subjectLevels,
  isAddModule,
  setIsAddModule,
}: {
  modules: Module[];
  setModules: Function;
  currentSubject: Subject;
  currentLevel: Level;
  subjectLevels: SubjectLevel[];
  isAddModule: boolean;
  setIsAddModule: Function;
}) {
  const [currentSubjectLevel, setCurrentSubjectLevel] =
    useState<SubjectLevel>();

  useEffect(() => {
    const subjectLevel = subjectLevels.find(
      (subjectLevel) =>
        subjectLevel.level.id === currentLevel.id &&
        subjectLevel.subject.id === currentSubject.id
    );
    setCurrentSubjectLevel(subjectLevel);
  }, [currentLevel, currentSubject, subjectLevels]);

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
          <Dialog.Panel className="bg-gray-100 rounded-2xl shadow-xl p-8 z-10 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="mb-4 flex justify-between items-baseline">
              <div className="text-2xl ">
                <span>{currentSubject?.name}</span>{" "}
                <span>Level {currentLevel?.order}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModule(false)}
                className="text-gray-800"
              >
                Cancel
              </button>
            </Dialog.Title>
            <article className="grid sm:grid-cols-2 gap-2">
              <section className="bg-white border-2 col-span-1 rounded-lg p-4">
                <h3 className="text-xl mb-4">Current Modules</h3>
                <ul className="divide-y border rounded shadow-inner">
                  {modules?.map((module, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-300 flex justify-between"
                    >
                      <span>
                        Unit {module.order}: {module.name}
                      </span>{" "}
                      {/* <span>Edit</span> */}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white border-2 col-span-1 rounded-lg p-4">
                <h3 className="text-xl mb-4">New Module</h3>
                {currentSubjectLevel && (
                  <AddModuleForm
                    setModules={setModules}
                    currentSubjectLevel={currentSubjectLevel}
                  />
                )}
              </section>
            </article>

            
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};