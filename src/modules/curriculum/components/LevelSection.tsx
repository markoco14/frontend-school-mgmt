import { Spinner } from "@/src/components/ui/spinner";
import { Level } from "@/src/modules/curriculum/entities/Level";
import listLevels from "@/src/modules/curriculum/requests/listLevels";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LevelList from "./LevelList";

export default function LevelSection() {

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>();

  const router = useRouter();
  const schoolSlug = router.query.school as string

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
      {loading ? (
        <Spinner />
      ) : levels ? (

        <LevelList levels={levels} />
      ) : (
        <p>No levels</p>
      )}
    </section>
  );
}
