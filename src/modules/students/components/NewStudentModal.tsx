import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Spinner } from "@/src/components/ui/spinner";
import { School } from "@/src/modules/schools/entities/School";
import getSchoolBySlug from "@/src/modules/schools/requests/getSchoolBySlug";
import { Student } from "@/src/modules/students/entities/Student";
import addStudent from "@/src/modules/students/requests/addStudent";
import { useEffect, useState } from "react";
import { NewStudent } from "../entities/NewStudent";

type Inputs = {
  firstName: string;
  lastName: string;
  age: number;
  gender: number;
};

export default function RegisterNewStudentModal({
  selectedSchool,
  setStudents,
}: {
  selectedSchool: string;
  setStudents: Function;
}) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!school) {
      toast.error("No school data. Please close the form and try again.")
      return
    }

    const newStudent = new NewStudent(
      data.firstName,
      data.lastName,
      data.age,
      data.gender,
      school?.id
    )

    try {
      const student: Student = await addStudent({
        newStudent: newStudent
      });
      toast.success("Student added.");
      setStudents((prevStudents: Student[]) =>
        [...prevStudents, student]
          .sort((a: Student, b: Student) => {
            if (a.lastName < b.lastName) {
              return -1;
            }
            if (a.lastName > b.lastName) {
              return 1;
            }
            return 0;
          }),
      );
      reset();
    } catch (error) {
      toast.error("Unable to add new student.")
    }
  };

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const school = await getSchoolBySlug(selectedSchool);
        setSchool(school)
      } catch (error) {
        toast.error("Unable to get school data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [selectedSchool])

  return (
    loading ? (
      <div className="min-h-[300px] grid place-content-center">
        <Spinner color={"blue"} />
      </div>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[300px]">
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
          {
            errors.firstName?.type === "required" && (
              <p role="alert" className="mt-2 text-red-500">
                First name is required
              </p>
            )
          }
        </div >
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
          <select
            {...register("gender", { required: true })}
          >
            <option value="0">Boy</option>
            <option value="1">Girl</option>
          </select>
          {errors.gender?.type === "required" && (
            <p role="alert" className="mt-2 text-red-500">
              Gender is required
            </p>
          )}
        </div>
        <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
          Add
        </button>
      </form >
    )
  );
}
