import { Teacher } from "../../domain/entities/Teacher";

const StaffList = ({ teachers }: { teachers: Teacher[] }) => {
  return (
    <ul className="mb-4 rounded bg-gray-100 shadow-inner">
      {teachers?.map((teacher: any, index: number) => (
        <li key={index} className="grid grid-cols-3 p-2 hover:bg-gray-300">
          <span>{teacher.first_name}</span>
          <span>{teacher.last_name}</span>
          <span>{teacher.email}</span>
          {/* <span>remove</span> */}
        </li>
      ))}
    </ul>
  );
}

export default StaffList
