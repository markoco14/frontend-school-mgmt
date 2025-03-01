import { Spinner } from "@/src/components/ui/spinner";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { School } from "@/src/modules/schools/entities/School";
import getSchoolBySlug from "@/src/modules/schools/requests/getSchoolBySlug";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NewSubject } from "../entities/NewSubject";
import addSubject from "../requests/addSubject";

type Inputs = {
  subjectName: string;
};

const AddSubjectForm = ({ setSubjects }: { setSubjects: Function }) => {
  const [school, setSchool] = useState<School>();
  const router = useRouter();
  const schoolSlug = router.query.school as string
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!school) return

    const newSubject = new NewSubject(
      data.subjectName,
      school.id
    )

    try {
      setIsAdding(true)
      const subject = await addSubject(newSubject)
      setSubjects((prevSubjects: Subject[]) => [...prevSubjects, subject])
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unable to add new subject")
      }
    } finally {
      setIsAdding(false)
      reset();
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsFetching(true)
        const school = await getSchoolBySlug(schoolSlug);
        setSchool(school)
      } catch (error) {
        toast.error("Unable to get school data. Please try again.")
      } finally {
        setIsFetching(false)
      }
    }

    getData()
  }, [schoolSlug])

  return (
    isFetching ? (
      <Spinner />
    ) : (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col">
          <label>Name</label >
          <input
            className="p-2 shadow"
            type="text"
            {...register("subjectName", {
              required: true,
              minLength: 1,
              maxLength: 50,
            })}
          />
          {
            errors.subjectName?.type === "required" && (
              <p role="alert" className="mt-2 text-red-500">
                Subject name is required
              </p>
            )
          }
        </div >
        <button disabled={isAdding} className="rounded bg-blue-300 px-2 py-1 text-blue-900 disabled:bg-gray-300 disabled:text-gray-900">
          Submit
        </button>
      </form >
    )
  );
};

export default AddSubjectForm;
