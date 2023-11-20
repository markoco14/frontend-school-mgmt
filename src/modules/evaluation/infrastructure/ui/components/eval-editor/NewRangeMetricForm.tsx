import { useUserContext } from "@/src/UserContext";
import Modal from "@/src/modules/core/components/Modal";
import { EvaluationAttribute } from "@/src/modules/evaluation/domain/entities/EvaluationAttribute";
import { RangeAttributePayload } from "@/src/modules/evaluation/domain/entities/payloads/RangeAttributePayload";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { rangeAttributeAdapter } from "../../../adapters/rangeAttributeAdapter";

// TODO: make this work. left alone for now because descriptions can be null
const Descriptions = ({
  maxValue,
  descriptions,
  setDescriptions,
}: {
  maxValue: number;
  descriptions: { [key: string]: string }[];
  setDescriptions: Function;
}) => {
  const [currentDescriptions, setCurrentDescriptions] = useState<
    { [key: string]: string }[]
  >([]);
  const fakeDescriptions = {
    "1": "Student does not try to be a part of class activities and does not answer any questions.",
    "2": "Student tries to be a part of class activities, but often loses focus.",
    "3": "Student is always part of class activities and answers many questions.",
  };
  console.log("descriptions", descriptions);
  console.log("current descriptions", currentDescriptions);
  //   const arr = Array(maxValue).fill(0);
  //   const arr2 = Array(maxValue)
  //     .fill(0)
  //     .map((_, i) => ({ [i + 1]: "" }));
  // 	const descriptionObject =Object.keys(arr2)

  //   console.log('arr', arr)
  //   console.log('arr2', arr2)
  //   console.log('desc object', descriptionObject)
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

type Inputs = {
  name: string;
  max: number;
  descriptions: { [key: string]: string }[];
};

const NewRangeMetricForm = ({ setAttributes }: { setAttributes: Function }) => {
  const { selectedSchool } = useUserContext();
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const name = watch("name");
  const maxValue = watch("max");
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }[]>(
    [],
  );
  const [isWriteDescriptions, setIsWriteDescriptions] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const data_type_id = 9;
    const payload: RangeAttributePayload = {
      name: data.name,
      school_id: selectedSchool?.id,
      data_type_id: 2,
      min_value: 1,
      max_value: data.max,
      descriptions: null,
    };
    await rangeAttributeAdapter.add({ payload: payload }).then((res) => {
      setAttributes((prevAttributes: EvaluationAttribute[]) => [
        ...prevAttributes,
        res,
      ]);
      toast.success("Success");
      reset();
    });
    return;
  };

  function handleClose() {
    setIsWriteDescriptions(false);
  }

  return (
    <>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 grid gap-2">
            <label>Minimum Score</label>
            <input
              type="number"
              disabled={true}
              defaultValue={1}
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
        {/* <p>You need to choose descriptions for {name} before you can save.</p> */}
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={true}
            type="button"
            onClick={() => setIsWriteDescriptions(true)}
            className="rounded border border-blue-700 bg-blue-100 px-2 py-1 text-blue-900 disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-300 disabled:text-gray-600"
          >
            Descriptions
          </button>
          <button className="rounded bg-blue-700 px-2 py-1 text-white disabled:bg-gray-700 ">
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
