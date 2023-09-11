import { ClassEntity } from "@/src/modules/classes/domain/entities/ClassEntity";

const ClassList = ({
  todayClasses,
  selectedClass,
  handleClick,
}: {
  todayClasses: ClassEntity[];
  selectedClass: ClassEntity | undefined;
  handleClick: Function;
}) => {
  return (
    <ul className="grid divide-y">
      {todayClasses?.map((classEntity) => (
        <li
          key={`class-${classEntity.id}`}
          onClick={() => handleClick({ classEntity: classEntity })}
          className={`${
            classEntity.id === selectedClass?.id ? "bg-blue-300" : ""
          } flex w-full cursor-pointer items-center justify-between rounded p-2`}
        >
          <span>
            {classEntity.name} ({classEntity.id})
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ClassList;
