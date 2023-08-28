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
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
            <Dialog.Title>Create New Module</Dialog.Title>
            <p>
              You are creating a new Module for {currentSubject?.name} Level{" "}
              {currentLevel?.order}{" "}
            </p>
            <article className="grid grid-cols-2">
              <section>
                <p>Current Modules</p>
                <ul className="bg-gray-100 rounded shadow-inner mb-4">
                  {modules?.map((module, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-300 flex justify-between"
                    >
                      <span>
                        {module.order}. {module.name}
                      </span>{" "}
                      <span>Edit</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <p>New Module</p>
                {currentSubjectLevel && (
                  <AddModuleForm
                    setModules={setModules}
                    currentSubjectLevel={currentSubjectLevel}
                  />
                )}
              </section>
            </article>

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