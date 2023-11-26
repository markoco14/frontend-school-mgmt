import { Level } from "@/src/modules/curriculum/entities/Level";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { levelAdapter } from "../adapters/levelAdapter";
import AddLevelForm from "./AddLevelForm";

export default function AddLevel({
  setCount,
  setPage,
  setNext,
  levels,
  setLevels,
}: {
  count: number;
  setCount: Function;
  page: number;
  levels: Level[];
  setPage: Function;
  setNext: Function;
  setLevels: Function;
}) {
  const [isAddLevel, setIsAddLevel] = useState<boolean>(false);

  async function handleAddLevel({
    name,
    school,
    order,
  }: {
    name: string;
    school: number;
    order: number;
  }) {
    try {
      await levelAdapter
        .addLevel({ name: name, school: school, order: order })
        .then((res) => {
          // WAIT FOR RESPONSE B/C IF FAILED DO NOTHING

          // 1: CHECK IS THE RESPONSE.ORDER GREATER THAN THE HIGHEST ORDER? === BUMP USER TO NEXT PAGE
          if (res.order > levels[9]?.order) {
            setPage((prevPage: number) => prevPage + 1);
          }

          // 2: IF COUNT CURRENTLY 10, TOGGLE SHOW PAGE BUTTONS

          if (levels.length + 1 === 11) {
            setCount(11);
            setNext(true);
          }
          // 3: ELSE JUST DO AS WE DO
          setLevels((prevLevels: Level[]) => {
            const newLevels = [...prevLevels, res].sort(
              (a, b) => a.order - b.order,
            );

            if (prevLevels.length >= 10) {
              newLevels.pop();
            }

            return newLevels;
          });
          toast.success("Level added.");
        });
    } catch (error) {
      toast.error("Unable to add new level")
    }
  }

  return (
    <>
      <button
        className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white"
        onClick={() => setIsAddLevel(true)}
      >
        Add Level
      </button>
      <Transition
        show={isAddLevel}
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition ease-out duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Dialog
          onClose={() => setIsAddLevel(false)}
          className="fixed inset-0 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-blue-900/25" />
          <Dialog.Panel className="z-10 rounded-2xl bg-white p-8 shadow-xl">
            <Dialog.Title>Add Level</Dialog.Title>
            <AddLevelForm handleAddLevel={handleAddLevel} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAddLevel(false)}
                className="rounded bg-gray-300 px-4 py-1 text-gray-900 hover:bg-gray-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
}
