import { Spinner } from "@/src/components/ui/spinner";
import ListContainer from "@/src/modules/core/components/ListContainer";
import { subjectLevelAdapter } from "@/src/modules/curriculum/adapters/subjectLevelAdapter";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { Level } from "@/src/modules/curriculum/levels/entities/Level";
import listLevels from "@/src/modules/curriculum/levels/requests/listLevels";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddSubjectLevelForm = ({
  subject,
  subjectLevels,
  setSubjectLevels,
}: {
  subject: Subject;
  subjectLevels: SubjectLevel[];
  setSubjectLevels: Function;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[] | null>(null);
  const router = useRouter();
  const schoolSlug = router.query.school as string;

  useEffect(() => {
    async function listSchoolLevels() {
      setLoading(true);
      await listLevels(schoolSlug)
        .then((res) => {
          setLevels(res);
          setLoading(false);
        });
    }

    if (schoolSlug) {
      listSchoolLevels();
    }
  }, [schoolSlug]);

  async function handleAddSubjectLevel({
    subject,
    level,
  }: {
    subject: Subject;
    level: Level;
  }) {
    try {
      await subjectLevelAdapter
        .addSubjectLevel({ subject: subject.id, level: level.id })
        .then((res) => {
          setSubjectLevels((prevSubjectLevels: SubjectLevel[]) => [
            ...prevSubjectLevels,
            res,
          ]);
          toast.success(`Added level ${level.name} to ${subject.name}`);
        });
    } catch (err) {
      toast.error("Unable to add level to subject.")
    }
  }

  function checkLevelAssigned({
    level,
    subject,
    subjectLevels,
  }: {
    level: Level;
    subject: Subject;
    subjectLevels: SubjectLevel[];
  }) {
    return subjectLevels?.some((subjectLevel: SubjectLevel) => {
      return (
        subjectLevel.level.id === level.id &&
        subjectLevel.subject.id === subject?.id
      );
    });
  }

  return (
    <ListContainer>
      {loading ? (
        <Spinner />
      ) : !levels ? (
        <p>no levels</p>
      ) : (
        levels?.map((level, index) => (
          <li key={index}>
            <button
              disabled={checkLevelAssigned({
                level: level,
                subject: subject,
                subjectLevels: subjectLevels,
              })}
              onClick={() => {
                handleAddSubjectLevel({
                  subject: subject,
                  level: level,
                });
              }}
              className={`${checkLevelAssigned({
                level: level,
                subject: subject,
                subjectLevels: subjectLevels,
              })
                ? "bg-blue-300 hover:bg-blue-500"
                : "hover:bg-gray-300 "
                } flex w-full justify-between p-2 disabled:cursor-not-allowed`}
            >
              {level.name}
            </button>
          </li>
        )
        )
      )}
    </ListContainer>
  );
};

export default AddSubjectLevelForm;
