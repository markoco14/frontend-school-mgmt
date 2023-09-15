import AuthContext from "@/src/AuthContext";
import { subjectAdapter } from "@/src/modules/curriculum/infrastructure/adapters/subjectAdapter";
import { useContext} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Subject } from "../../../domain/entities/Subject";

type Inputs = {
  subjectName: string;
};

const AddSubjectForm = ({ setSubjects }: { setSubjects: Function }) => {
  const { selectedSchool } = useContext(AuthContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await subjectAdapter
        .addSubject({ name: data.subjectName, school: selectedSchool.id })
        .then((res) => {
          setSubjects((prevSubjects: Subject[]) => [...prevSubjects, res]);
          toast.success("Subject added.");
        });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col">
        <label>Name</label>
        <input
          className="p-2 shadow"
          type="text"
          {...register("subjectName", {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
        />
        {errors.subjectName?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Level name is required
          </p>
        )}
      </div>
      <button className="rounded bg-blue-300 px-2 py-1 text-blue-900">
        Submit
      </button>
    </form>
  );
}

export default AddSubjectForm;