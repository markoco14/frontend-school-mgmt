import { Level } from "@/src/modules/curriculum/entities/Level";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { Module } from "@/src/modules/curriculum/entities/Module";
import AddModuleForm from "./AddModuleForm";

export default function AddModule({
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
      subjectLevel.subject.id === currentSubject.id,
  );

  return (
    <article className="mb-4 grid gap-2 sm:grid-cols-2">
      <section className="col-span-1 rounded-lg border-2 bg-white p-4">
        <h3 className="mb-4 text-xl">Current Modules</h3>
        <ul className="divide-y rounded border shadow-inner">
          {modules?.map((module, index) => (
            <li
              key={index}
              className="flex justify-between p-2 hover:bg-gray-300"
            >
              <span>
                Unit {module.order}: {module.name}
              </span>{" "}
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-1 rounded-lg border-2 bg-white p-4">
        <h3 className="mb-4 text-xl">New Module</h3>
        {currentSubjectLevel && (
          <AddModuleForm
            setModules={setModules}
            currentSubjectLevel={currentSubjectLevel}
          />
        )}
      </section>
    </article>
  );
}
