import { useUserContext } from "@/src/UserContext";
import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Level } from "@/src/modules/curriculum/entities/Level";
import { levelAdapter } from "../../adapters/levelAdapter";
import { subjectLevelAdapter } from "../../adapters/subjectLevelAdapter";

const AddSubjectLevelForm = ({
  subject,
  subjectLevels,
  setSubjectLevels,
}: {
  subject: Subject;
  subjectLevels: SubjectLevel[];
  setSubjectLevels: Function;
}) => {
  const { selectedSchool } = useUserContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    async function listSchoolLevels() {
      setLoading(true);
      await levelAdapter
        .listSchoolLevels({ school_id: selectedSchool?.id })
        .then((res) => {
          setLevels(res);
          setLoading(false);
        });
    }

    if (selectedSchool) {
      listSchoolLevels();
    }
  }, [selectedSchool]);

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
      console.error(err);
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
    <ul className="mb-4 overflow-y-auto rounded bg-gray-100 shadow-inner">
      {levels?.length >= 1 ? (
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
              className={`${
                checkLevelAssigned({
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
        ))
      ) : (
        <article className="mb-4 rounded bg-gray-100 shadow-inner">
          <p>This page is empty.</p>
        </article>
      )}
    </ul>
  );
};

export default AddSubjectLevelForm;
