import AuthContext from "@/src/AuthContext";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  levelName: string;
}

export default function AddLevel({ setLevels }: {setLevels: Function}) {
	const { selectedSchool } = useContext(AuthContext);

  const { reset, register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await levelAdapter.addLevel({name: data.levelName, school: selectedSchool.id}).then((res) => {
        // because prevLevels implicitly has any type
        // @ts-ignore
        setLevels(prevLevels => [...prevLevels, res])
        toast.success('Level added.');
      });
      reset();
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    async function listSchoolLevels(id: number) {
      await levelAdapter.listSchoolLevels({id: id}).then((res) => {
        setLevels(res.results)
      });
    }

    if (selectedSchool) {
      try {
        listSchoolLevels(selectedSchool.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSchool, setLevels]);

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

