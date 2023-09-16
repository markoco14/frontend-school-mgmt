import Modal from "@/src/modules/core/infrastructure/ui/components/Modal";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  min: number;
  max: number;
  descriptions: { [key: string]: string }[];
};

const Descriptions = ({
  maxValue,
  descriptions,
  setDescriptions,
}: {
  maxValue: number;
  descriptions: { [key: string]: string }[];
  setDescriptions: Function;
}) => {
  console.log(maxValue);
  console.log(descriptions);
  return (
    <div className="grid gap-2">
      <p>Descriptions</p>
      <div className="flex items-center gap-2">
        <label className="flex aspect-square h-full justify-center rounded border p-2 shadow">
          1
        </label>
        <input className="rounded border p-2 shadow focus:ring" />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex aspect-square h-full justify-center rounded border p-2 shadow">
          2
        </label>
        <input className="rounded border p-2 shadow focus:ring" />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex aspect-square h-full justify-center rounded border p-2 shadow">
          3
        </label>
        <input className="rounded border p-2 shadow focus:ring" />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex aspect-square h-full justify-center rounded border p-2 shadow">
          4
        </label>
        <input className="rounded border p-2 shadow focus:ring" />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex aspect-square h-full justify-center rounded border p-2 shadow">
          5
        </label>
        <input className="rounded border p-2 shadow focus:ring" />
      </div>
    </div>
  );
};

const NewRangeMetricForm = () => {
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const name = watch("name");
  const minValue = watch("min");
  const maxValue = watch("max");
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }[]>(
    [],
  );
  const [isWriteDescriptions, setIsWriteDescriptions] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    return;
  };

  function handleClose() {
    setIsWriteDescriptions(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <label>Name</label>
          <input
            {...register("name", {
              minLength: 2,
              maxLength: 50,
            })}
            className="rounded border p-2 shadow"
          ></input>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 grid gap-2">
            <label>Minimum Score</label>
            <input
              type="number"
              disabled={true}
              defaultValue={1}
              {...register("min", {
                min: 2,
                valueAsNumber: true,
              })}
              className="w-full rounded border p-2 shadow"
            ></input>
          </div>
          <div className="col-span-1 grid gap-2">
            <label>Maximum Score</label>
            <input
              defaultValue={2}
              type="number"
              {...register("max", {
                min: 2,
                max: 10,
                valueAsNumber: true,
              })}
              className="w-full rounded border p-2 shadow"
            ></input>
          </div>
        </div>
        <hr></hr>
        <p>You need to choose descriptions for {name} before you can save.</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsWriteDescriptions(true)}
            className="rounded border border-blue-700 bg-blue-100 px-2 py-1 text-blue-900"
          >
            Behavior Descriptions
          </button>
          <button
            disabled={true}
            className="rounded bg-blue-700 px-2 py-1 text-white disabled:bg-gray-700 "
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        show={isWriteDescriptions}
        close={handleClose}
        title="Behavior Rating Descriptions"
      >
        <Descriptions
          maxValue={maxValue}
          descriptions={descriptions}
          setDescriptions={setDescriptions}
        />
      </Modal>
    </>
  );
};

export default NewRangeMetricForm;
