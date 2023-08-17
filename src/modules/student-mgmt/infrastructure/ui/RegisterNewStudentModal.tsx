import AuthContext from "@/src/AuthContext";
import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";
import { studentAdapter } from "@/src/modules/student-mgmt/infrastructure/adapters/studentAdapter";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  firstName: string
  lastName: string
  age: number
}

export default function RegisterNewStudentModal({setStudents}: {setStudents: Function}) {
	const { user, selectedSchool } = useContext(AuthContext);

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const student: Student = await studentAdapter.addStudent({
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        schoolId: Number(selectedSchool.id)
      });
      toast.success('Student added.');
			setStudents((prevStudents: Student[]) => [...prevStudents, student].sort((a: Student, b: Student) => {
             if (a.last_name < b.last_name) {
                return -1;
              }
              if (a.last_name > b.last_name) {
                return 1;
              }
              return 0;
          }).slice(0,10))
      reset();
    } catch (error) {
      console.error(error)
    }
  };

  return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col mb-4">
				<label className='mb-2'>First Name</label>
				<input
					className="px-1 py-2 rounded shadow"
					type="text"
					{...register("firstName", { required: true, minLength: 2, maxLength: 50 })}
				/>
				{errors.firstName?.type === "required" && (
					<p 
						role="alert"
						className='text-red-500 mt-2'
					>
						First name is required
					</p>
				)}
			</div>
			<div className="flex flex-col mb-4">
				<label className='mb-2'>Last Name</label>
				<input
					className="px-1 py-2 rounded shadow"
					type="text"
					{...register("lastName", { required: true, minLength: 1, maxLength: 50 })}
				/>
				{errors.lastName?.type === "required" && (
					<p 
						role="alert"
						className='text-red-500 mt-2'
					>
						Last name is required
					</p>
				)}
			</div>
			<div className="flex flex-col mb-4">
				<label className='mb-2'>Age</label>
				<input
					className="px-1 py-2 rounded shadow"
					type="number"
					{...register("age", { required: true, min: 1, max: 100 })}
				/>
				{errors.age?.type === "required" && (
					<p 
						role="alert"
						className='text-red-500 mt-2'
					>
						Age is required
					</p>
				)}
			</div>
			<button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
				Add
			</button>
		</form>
	)
}