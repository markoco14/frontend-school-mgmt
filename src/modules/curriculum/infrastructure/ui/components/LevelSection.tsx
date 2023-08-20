import AuthContext from "@/src/AuthContext";
import { Level } from "@/src/modules/class-mgmt/domain/entities/Level";
import { classAdapter } from "@/src/modules/class-mgmt/infrastructure/adapters/classAdapter";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddLevel from "./AddLevel";
import LevelList from "./LevelList";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";

export default function LevelSection() {
  const { selectedSchool } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [ isAddLevel, setIsAddLevel ] = useState<boolean>(false);

  useEffect(() => {
    async function listSchoolLevels(id: number) {
      setLoading(true);
      await levelAdapter.listSchoolLevels({id: id}).then((res) => {
        setLevels(res)
        setLoading(false);
      });
    }

    if (selectedSchool) {
      try {
        listSchoolLevels(selectedSchool.id);
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSchool]);

  async function handleDeleteLevel(levelId: number) {
    await levelAdapter.deleteLevel({id: levelId}).then((res) => {
      setLevels(prevLevels => prevLevels.filter((level) => level.id !== levelId))
      toast.success('Level added.');
    })
  }
  
  return (
    <section>
      <article>
        <LevelList levels={levels} handleDeleteLevel={handleDeleteLevel}/>
        <button
          className="bg-blue-300 text-blue-900 hover:bg-blue-500 hover:text-white px-4 py-1 rounded"
          onClick={() => setIsAddLevel(true)}
        >Add Level</button>
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
            <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-8 z-10">
              <Dialog.Title>Add Level</Dialog.Title>
              <AddLevel setLevels={setLevels}/>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddLevel(false)}
                  className="bg-gray-300 text-gray-900 hover:bg-gray-500 hover:text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </article>
    </section>
  );
}
