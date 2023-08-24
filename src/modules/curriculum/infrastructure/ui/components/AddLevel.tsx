import AuthContext from "@/src/AuthContext";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Level } from "../../../domain/entities/Level";

type Inputs = {
  levelName: string;
  order: number;
}

export default function AddLevel({ page, setLevels }: {page: number; setLevels: Function}) {
	const { selectedSchool } = useContext(AuthContext);

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await levelAdapter.addLevel({name: data.levelName, school: selectedSchool.id, order: data.order}).then((res) => {
        setLevels((prevLevels: Level[]) => [...prevLevels, res])
        toast.success('Level added.');
      });
      reset();
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    async function listSchoolLevels({id, page}: {id: number; page: number}) {
      await levelAdapter.listSchoolLevels({id: id, page: page}).then((res) => {
        setLevels(res.results)
      });
    }

    if (selectedSchool) {
      try {
        listSchoolLevels({id: selectedSchool.id, page: page});
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSchool, setLevels, page]);

  return (
    <div className="xs:col-span-1">
			<h2 className="text-2xl">Add new level</h2>
			<form 
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col mb-4">
					<label>Name</label>
					<input 
						className="shadow p-2"
						type="text" 
						{...register("levelName", {required: true, minLength: 1, maxLength: 50})}
					/>
					{errors.levelName?.type === "required" && (
						<p 
							role="alert"
							className='text-red-500 mt-2'
						>
							Level name is required
						</p>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label>Order</label>
					<input 
						className="shadow p-2"
						type="number"
						{...register("order", {required: true, min: 1})}
					/>
					{errors.order?.type === "required" && (
						<p 
							role="alert"
							className='text-red-500 mt-2'
						>
							Order is required
						</p>
					)}
				</div>
				<button className="bg-blue-300 px-2 py-1 rounded text-blue-900">
					Submit
				</button>
			</form>
		</div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

