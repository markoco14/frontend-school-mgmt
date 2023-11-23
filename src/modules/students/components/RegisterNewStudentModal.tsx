import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUserContext } from "@/src/contexts/UserContext";
import { studentAdapter } from "@/src/modules/students/adapters/studentAdapter";
import { Student } from "@/src/modules/students/entities/Student";

type Inputs = {
  firstName: string;
  lastName: string;
  age: number;
  gender: number;
};

export default function RegisterNewStudentModal({
  setStudents,
}: {
  setStudents: Function;
}) {
  const { selectedSchool } = useUserContext();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let gender = Number(data.gender);
    let male =
      "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_3.jpeg";
    let female =
      "https://storage.googleapis.com/twle-445f4.appspot.com/images/student_4.jpeg";
    Number(data.gender) === 1
      ? console.log("female", female)
      : console.log("male", male);
    // return;
    try {
      const student: Student = await studentAdapter.addStudent({
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        gender: Number(data.gender),
        photo_url: gender === 1 ? female : male,
        schoolId: Number(selectedSchool?.id),
      });
      toast.success("Student added.");
      setStudents((prevStudents: Student[]) =>
        [...prevStudents, student]
          .sort((a: Student, b: Student) => {
            if (a.last_name < b.last_name) {
              return -1;
            }
            if (a.last_name > b.last_name) {
              return 1;
            }
            return 0;
          })
          .slice(0, 10),
      );
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">First Name</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="text"
          {...register("firstName", {
            required: true,
            minLength: 2,
            maxLength: 50,
          })}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            First name is required
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Last Name</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="text"
          {...register("lastName", {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
        />
        {errors.lastName?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Last name is required
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Age</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="number"
          {...register("age", { required: true, min: 1, max: 100 })}
        />
        {errors.age?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Age is required
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Gender</label>
        <input
          className="rounded px-1 py-2 shadow"
          type="number"
          {...register("gender", { required: true, min: 0, max: 1 })}
        />
        {errors.gender?.type === "required" && (
          <p role="alert" className="mt-2 text-red-500">
            Gender is required
          </p>
        )}
      </div>
      <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
        Add
      </button>
    </form>
  );
}
