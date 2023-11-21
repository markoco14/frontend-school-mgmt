import { useUserContext } from "@/src/UserContext";
import { Module } from "@/src/modules/curriculum/entities/Module";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { assessmentAdapter } from "../../../adapters/assessmentAdapter";
import NewAssessmentForm from "./NewAssessmentForm";

type Inputs = {
  name: string;
  description: string;
  module: number;
  type: number;
  order: number;
  max_score: number;
  status: number;
};

export default function AssessmentSection() {
  const { selectedSchool } = useUserContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [modules, setModules] = useState<Module[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // return
    selectedSchool &&
      (await assessmentAdapter
        .add({
          name: data.name,
          description: data.description,
          module: data.module,
          type: data.type,
          order: data.order,
          max_score: data.max_score,
          status: data.status,
        })
        .then((res) => {
          // toast.success("Content saved successfully!");
          // setModules((prevTypes: Module[]) => [...prevTypes, res]);
        }));
    reset();
    return;
  };

  // function handleClose() {
  //   setSelectedType(null);
  //   setIsManageType(false);
  // }

  useEffect(() => {
    async function getData() {
      await assessmentAdapter
        .listWithDetails({ schoolId: selectedSchool?.id })
        .then((res) => {
          const subjectNames = res.map(
            (module) => module.subject_level.subject.name,
          );

          // Remove duplicates by converting the array to a Set and then back to an array
          const uniqueSubjectNames = Array.from(new Set(subjectNames));

          setModules(res);
          setSubjects(uniqueSubjectNames);
        });
    }

    selectedSchool && getData();
  }, [selectedSchool]);

  return (
    <section>
      <h2 className="mb-4 text-3xl">Content</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
          <h3 className="text-xl">{selectedSchool?.name} Content</h3>
          {modules?.length === 0 ? (
            <p>There are no modules.</p>
          ) : (
            subjects?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="grid gap-2 divide-y">
                <h3 className="text-lg">{category}</h3>
                <ul className="grid gap-2 pt-2">
                  {modules
                    ?.filter(
                      (module) =>
                        module.subject_level.subject.name === category,
                    )
                    .map((filteredModule, index) => (
                      <li
                        key={index}
                        className="grid"
                        onClick={() => {
                          setSelectedModule(filteredModule);
                        }}
                      >
                        <span className="hover:cursor-pointer hover:underline hover:underline-offset-4">
                          Level {filteredModule.subject_level.level.order} Unit{" "}
                          {filteredModule.order}: {filteredModule.name}{" "}
                        </span>
                        {filteredModule.assessments &&
                          filteredModule.assessments.length > 0 && (
                            <ul className="grid gap-2 pt-2 indent-4">
                              {filteredModule.assessments.map(
                                (assessment, assessmentIndex) => (
                                  <li key={assessmentIndex}>
                                    {assessment.name}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </article>
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
          {!selectedModule && (
            <>
              <p>Click a module to add assessments.</p>
            </>
          )}
          {selectedModule && (
            <>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl text-gray-500">
                  New {selectedModule.subject_level.subject.name} L
                  {selectedModule.subject_level.level.order}{" "}
                  {selectedModule.name} Content
                </h3>
                <button onClick={() => setSelectedModule(null)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <NewAssessmentForm selectedModule={selectedModule} />
            </>
          )}
        </article>
      </div>
      {/* <Modal show={isManageType} close={handleClose} title={"Manage Content Type"}>
				<ManageAssessmentType 
					types={assessmentTypes}
          setTypes={setAssessmentTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
				/>
			</Modal> */}
    </section>
  );
}
