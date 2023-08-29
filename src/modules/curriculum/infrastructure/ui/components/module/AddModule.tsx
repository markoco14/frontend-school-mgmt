import { useEffect, useState } from "react";
import { Level } from "../../../../domain/entities/Level";
import { Module } from "../../../../domain/entities/Module";
import { Subject } from "../../../../domain/entities/Subject";
import { SubjectLevel } from "../../../../domain/entities/SubjectLevel";
import AddModuleForm from "./AddModuleForm";

export default function AddModule ({
  modules,
  setModules,
  currentSubject,
  currentLevel,
  subjectLevels,
}: {
  modules: Module[];
  setModules: Function;
  currentSubject: Subject;
  currentLevel: Level;
  subjectLevels: SubjectLevel[];
}) {
    const currentSubjectLevel = subjectLevels.find(
      (subjectLevel) =>
        subjectLevel.level.id === currentLevel.id &&
        subjectLevel.subject.id === currentSubject.id
    );

  return (
    <article className="grid sm:grid-cols-2 gap-2 mb-4">
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
  );
};