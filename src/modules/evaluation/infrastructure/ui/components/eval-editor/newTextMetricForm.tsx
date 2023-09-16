import AuthContext from "@/src/AuthContext";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const NewTextMetricForm = () => {
  const { selectedSchool } = useContext(AuthContext);
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const name = watch("name");
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }[]>(
    [],
  );
  const [isWriteDescriptions, setIsWriteDescriptions] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const preparedData = {
      name: data.name,
      school_id: selectedSchool?.id,
      data_type_id: 8,
    };
    console.log("prepared data", preparedData);
    return;
  };

  function handleClose() {
    setIsWriteDescriptions(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 p-8">
      <div className="grid gap-2">
        <label>Name</label>
        <input
          {...register("name", {
            minLength: 1,
            maxLength: 50,
            required: true,
          })}
          className="rounded border p-2 shadow"
        ></input>
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-500">
            Metric name is required
          </p>
        )}
      </div>
      <hr></hr>
      {/* <p>You need to choose descriptions for {name} before you can save.</p> */}

      <div className="grid grid-cols-2 gap-4">
        <button className="col-start-2 rounded bg-blue-700 px-2 py-1 text-white disabled:bg-gray-700 ">
          Save
        </button>
      </div>
    </form>
  );
};

export default NewTextMetricForm;
