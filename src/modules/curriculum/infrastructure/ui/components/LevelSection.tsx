import AuthContext from "@/src/AuthContext";
import { Level } from "@/src/modules/curriculum/domain/entities/Level";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import LevelList from "./LevelList";
import { levelAdapter } from "@/src/modules/curriculum/infrastructure/adapters/levelAdapter";
import PaginationButtons from "@/src/modules/core/infrastructure/ui/components/PaginationButtons";
import AddLevel from "./AddLevel";

export default function LevelSection() {
  const { selectedSchool } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [page, setPage] = useState<number>(1)
  const [next, setNext] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function listSchoolLevels(id: number) {
      setLoading(true);
      await levelAdapter.listSchoolLevels({id: id, page: page}).then((res) => {
        console.log(res)
        if (res.next) {
          setNext(true);
        } else {
          setNext(false);
        }
        setLevels(res.results);
        setCount(res.count);
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
  }, [selectedSchool, page]);

  async function fetchSchoolLevels(id: number) {
    setLoading(true);
      await levelAdapter.listSchoolLevels({id: id, page: page}).then((res) => {
        console.log(res)
        if (res.next) {
          setNext(true);
        } else {
          setNext(false);
        }
        setLevels(res.results);
        setCount(res.count);
        setLoading(false);
      });
  }

  async function handleDeleteLevel(levelId: number) {
    await levelAdapter.deleteLevel({id: levelId}).then((res) => {
      if (levels.length === 1 && page > 1) {
        setPage((prevPage: number) => prevPage - 1)
        return
      }

      if (levels.length - 1 === 9) {
        fetchSchoolLevels(selectedSchool.id)
      }
     
      setLevels(prevLevels => prevLevels.filter((level) => level.id !== levelId))
      toast.success('Level deleted.');
    })
  }
  
  return (
    <section>
      <article>
        <LevelList levels={levels} handleDeleteLevel={handleDeleteLevel}/>
        <PaginationButtons count={count} page={page} setPage={setPage} next={next}/>
        <AddLevel setCount={setCount} levels={levels} count={count} page={page} setPage={setPage} setNext={setNext} setLevels={setLevels}/>
      </article>
    </section>
  );
}
