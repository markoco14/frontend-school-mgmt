import AuthContext from "@/src/AuthContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { Subject } from "../../../domain/entities/Subject";
import { SubjectLevel } from "../../../domain/entities/SubjectLevel";
import { Level } from "../../../domain/entities/Level";
import { Module } from "../../../domain/entities/Module";
import { moduleAdapter } from "../../adapters/moduleAdapter";
import { Dialog, Transition } from "@headlessui/react";
import { moduleTypeAdapter } from "../../adapters/moduleTypeAdapter";
import { ModuleType } from "../../../domain/entities/ModuleType";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  type: number;
  order: number;
};

const AddModuleForm = ({
  setModules,
  currentSubjectLevel,
}: {
  setModules: Function;
  currentSubjectLevel: SubjectLevel;
}) => {
  const { selectedSchool } = useContext(AuthContext);
  const [moduleTypes, setModuleTypes] = useState<ModuleType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function fetchSchoolModuleTypes({ schoolId }: { schoolId: number }) {
      await moduleTypeAdapter
        .listSchoolModuleTypes({ schoolId: schoolId })
        .then((res) => {
          setModuleTypes(res);
        });
    }

    selectedSchool && fetchSchoolModuleTypes({ schoolId: selectedSchool.id });
  }, [selectedSchool]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await moduleAdapter
      .add({
        name: data.name,
        type: Number(data.type),
        order: Number(data.order),
        subjectLevel: currentSubjectLevel.id,
      })
      .then((res) => {
        setModules((prevModules: Module[]) => [...prevModules, res]);
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label>Name</label>
        <input
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label>Order</label>
        <input
          {...register("order", {
            required: true,
            min: 1,
          })}
        />
        {errors.order && <span>This field is required</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label>Type</label>
        <div>
          {moduleTypes?.map((type, index) => (
            <label key={index}>
              <span>{type.name}</span>
              <input
                type="checkbox"
                value={type.id}
                {...register("type", {
                  required: true,
                })}
              />
            </label>
          ))}
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
};

const AddModule = ({
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
}) => {
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
          </div>
          <div className="col-span-4 xs:col-span-2">
            <h3 className="text-xl">Modules</h3>
            <ul className="bg-gray-100 rounded shadow-inner mb-4">
              {modules?.map((module, index) => (
                <li key={index} className="p-2 hover:bg-gray-300">
                  Unit {module.order} {module.name}
                </li>
              ))}
            </ul>
          </div>
          {isAddModule && currentSubject && currentLevel && (
            <AddModule
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
