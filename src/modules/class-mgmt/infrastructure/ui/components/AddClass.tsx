import AuthContext from "@/src/AuthContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Level } from "../../../../curriculum/domain/entities/Level";
import { classAdapter } from "../../adapters/classAdapter";
import { Class } from "../../../domain/entities/Class";
import toast from "react-hot-toast";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";
import PaginationButtons from "@/src/modules/core/infrastructure/ui/components/PaginationButtons";

type Inputs = {
  className: string;
  level: number;
  daysOfWeek: string[];
};


export default function AddClass({ setClasses }: { setClasses: Function }) {
	const { user, selectedSchool } = useContext(AuthContext);
  const [levels, setLevels] = useState<Level[]>([]);
  const [page, setPage] = useState<number>(1)
  const [next, setNext] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const days: number[] = [];
    data.daysOfWeek.forEach((day) => days.push(Number(day)));

    try {
      const newClass: Class = await classAdapter.addClass({
        name: data.className,
        school_id: selectedSchool.id,
        level: Number(data.level),
        day: days,
      });
      toast.success("New class added.");
			setClasses((prevClasses: Class[]) => [...prevClasses, newClass])
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getLevels() {
      await levelAdapter.listSchoolLevels({id: selectedSchool?.id, page: page}).then((res) => {
				if (res.next) {
          setNext(true);
        } else {
          setNext(false);
        }
        setLevels(res.results);
				setCount(res.count);
      });
    }

    if (user) {
      try {
        getLevels();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user, selectedSchool, page]);

  return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col mb-4">
				<label className="mb-2">Class Name</label>
				<input
					className="px-1 py-2 rounded shadow"
					type="text"
					{...register("className", {
						required: true,
						minLength: 2,
						maxLength: 50,
					})}
				/>
				{errors.className?.type === "required" && (
					<p role="alert" className="text-red-500 mt-2">
						Class name is required
					</p>
				)}
			</div>
			<div className="flex flex-col mb-4">
				<label>Level</label>
				{levels?.map((level: Level, index: number) => (
					<div className="flex flex-col" key={index}>
						<label className="text-center">{level.name}</label>
						<input
							type="checkbox"
							{...register("level", { required: true })}
							value={level.id}
						/>
					</div>
				))}
				{errors.level?.type === "required" && (
					<p role="alert" className="text-red-500 mt-2">
						Level is required
					</p>
				)}
				<PaginationButtons count={count} page={page} setPage={setPage} next={next}/>
			</div>
			<div className="grid grid-cols-5 mb-4">
				<div className="flex flex-col">
					<label className="text-center">Monday</label>
					<input
						type="checkbox"
						{...register("daysOfWeek", { required: true })}
						value={1}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-center">Tuesday</label>
					<input
						type="checkbox"
						{...register("daysOfWeek", { required: true })}
						value={2}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-center">Wednesday</label>
					<input
						type="checkbox"
						{...register("daysOfWeek", { required: true })}
						value={3}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-center">Thursday</label>
					<input
						type="checkbox"
						{...register("daysOfWeek", { required: true })}
						value={4}
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-center">Friday</label>
					<input
						type="checkbox"
						{...register("daysOfWeek", { required: true })}
						value={5}
					/>
				</div>
				{errors.daysOfWeek?.type === "required" && (
					<p role="alert" className="text-red-500 mt-2 col-span-5">
						Days are required
					</p>
				)}
			</div>
			<button className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded">
				Add
			</button>
		</form>
  );
}