import { useUserContext } from "@/src/UserContext";
import PaginationButtons from "@/src/modules/core/components/PaginationButtons";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Level } from "@/src/modules/curriculum/entities/Level";
import AddLevel from "./AddLevel";
import LevelList from "./LevelList";

export default function LevelSection() {
  const { selectedSchool } = useUserContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>();
  const [page, setPage] = useState<number>(1);
  const [next, setNext] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function listSchoolLevels() {
      setLoading(true);
      selectedSchool &&
        (await levelAdapter
          .listSchoolLevels({
            school_id: selectedSchool?.id,
          })
          .then((res) => {
            setLevels(res);
            setLoading(false);
          }));
    }

    if (selectedSchool) {
      try {
        listSchoolLevels();
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSchool, page]);

  async function fetchSchoolLevels(id: number) {
    setLoading(true);
    await levelAdapter.listSchoolLevels({ school_id: id }).then((res) => {
      setLevels(res);
      setLoading(false);
    });
  }

  async function handleDeleteLevel(levelId: number) {
    if (levels) {
      await levelAdapter.deleteLevel({ id: levelId }).then((res) => {
        if (res.status === 500) {
          toast.error(
            "Cannot delete. There may be Classes assigned to this level.",
          );
          return;
        }
        if (levels?.length === 1 && page > 1) {
          setPage((prevPage: number) => prevPage - 1);
          return;
        }

        if (levels?.length - 1 === 9 && selectedSchool) {
          fetchSchoolLevels(selectedSchool.id);
        }

        setLevels(
          (prevLevels) => prevLevels?.filter((level) => level.id !== levelId),
        );
        toast.success("Level deleted.");
      });
    }
  }

  return (
    <section className="col-span-2 rounded border p-4 shadow xs:col-span-1">
      {loading && <p>Loading...</p>}
      <article>
        {levels && (
          <LevelList levels={levels} handleDeleteLevel={handleDeleteLevel} />
        )}
        <PaginationButtons
          count={count}
          page={page}
          setPage={setPage}
          next={next}
        />
        {levels && (
          <AddLevel
            setCount={setCount}
            levels={levels}
            count={count}
            page={page}
            setPage={setPage}
            setNext={setNext}
            setLevels={setLevels}
          />
        )}
      </article>
    </section>
  );
}
