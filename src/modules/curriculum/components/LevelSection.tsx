import { Spinner } from "@/src/components/ui/spinner";
import Modal from "@/src/modules/core/components/Modal";
import { Level } from "@/src/modules/curriculum/entities/Level";
import listLevels from "@/src/modules/curriculum/levels/requests/listLevels";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddLevelForm from "./AddLevelForm";
import LevelList from "./LevelList";

export default function LevelSection() {

  const [loading, setLoading] = useState<boolean>(true);
  const [levels, setLevels] = useState<Level[]>([]);

  const [isAddLevel, setIsAddLevel] = useState<boolean>(false);

  const router = useRouter();
  const schoolSlug = router.query.school as string

  function handleClose() {
    setIsAddLevel(false);
  }

  useEffect(() => {
    async function getData() {

      if (!schoolSlug) {
        toast("No school selected")
        return
      }

      const levels = await listLevels(schoolSlug);
      setLevels(levels)
    }

    try {
      setLoading(true)
      getData();
    } catch (error) {
      toast.error("Unable to get levels")
    } finally {
      setLoading(false);
    }
  }, [schoolSlug]);

  return (
    <section className="col-span-2 rounded border p-4 shadow xs:col-span-1">
      <div className="flex justify-between">
        <h2 className="text-3xl mb-2">Levels</h2>
        <button onClick={() => { setIsAddLevel(!isAddLevel) }}>New</button>
      </div>
      {loading ? (
        <Spinner />
      ) : !loading && levels && levels.length === 0 ? (
        <p>No levels</p>
      ) : (
        <LevelList levels={levels} />
      )}
      <Modal
        show={isAddLevel}
        close={handleClose}
        title="Add New Level"
      >
        <AddLevelForm setLevels={setLevels} />
      </Modal>
    </section>
  );
}
