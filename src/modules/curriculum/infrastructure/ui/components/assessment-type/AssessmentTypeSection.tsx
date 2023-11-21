import { useUserContext } from "@/src/UserContext";
import Modal from "@/src/modules/core/components/Modal";
import { AssessmentType } from "@/src/modules/curriculum/entities/AssessmentType";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { assessmentTypeAdapter } from "../../../adapters/assessmentTypeAdapter";
import ManageAssessmentType from "./ManageAssessmentType";

type Inputs = {
  name: string;
};

export default function AssessmentTypeSection() {
  const { selectedSchool } = useUserContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [assessmentTypes, setAssessmentTypes] = useState<AssessmentType[]>([]);

  const [isManageType, setIsManageType] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AssessmentType | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    selectedSchool &&
      (await assessmentTypeAdapter
        .add({ schoolId: selectedSchool?.id, typeName: data.name })
        .then((res) => {
          toast.success("Module Type saved successfully!");
          setAssessmentTypes((prevTypes: AssessmentType[]) => [
            ...prevTypes,
            res,
          ]);
        }));
    reset();
    return;
  };

  function handleClose() {
    setSelectedType(null);
    setIsManageType(false);
  }

  useEffect(() => {
    async function getData() {
      await assessmentTypeAdapter
        .list({ schoolId: selectedSchool?.id })
        .then((res) => {
          setAssessmentTypes(res);
        });
    }

    selectedSchool && getData();
  }, [selectedSchool]);

  return (
    <section>
      <h2 className="mb-4 text-3xl">Content Types</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
          <h3 className="text-xl">Your Content Types</h3>
          {assessmentTypes?.length === 0 ? (
            <p>There are no module types.</p>
          ) : (
            <ul>
              {assessmentTypes?.map((type, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedType(type);
                    setIsManageType(true);
                  }}
                >
                  {type.name}
                </li>
              ))}
            </ul>
          )}
        </article>
        <article className="mb-4 flex flex-col gap-6 rounded border p-4 text-gray-700 shadow">
          <h3 className="text-xl">New Content Type</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="flex justify-between">
                <span>Name</span>{" "}
                {errors.name && <span className="text-red-500">required</span>}
              </label>
              <input
                className="rounded border p-2 shadow-inner"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
              />
            </div>
            <button className="w-full rounded bg-blue-600 p-2  text-white shadow duration-200 ease-in-out hover:bg-blue-900">
              Submit
            </button>
          </form>
        </article>
      </div>
      <Modal
        show={isManageType}
        close={handleClose}
        title={"Manage Content Type"}
      >
        <ManageAssessmentType
          types={assessmentTypes}
          setTypes={setAssessmentTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </Modal>
    </section>
  );
}
