import { Teacher } from "../../domain/entities/Teacher";

export default function TeacherList({ teachers }: { teachers: Teacher[] }) {
  return (
    <ul className="grid gap-2 rounded bg-gray-100 p-2 shadow-inner">
      {teachers?.map((teacher: any, index: number) => (
        <li
          key={index}
          className="grid rounded bg-white p-2 shadow hover:bg-gray-300 sm:grid-cols-3"
        >
          <span>{teacher.first_name}</span>
          <span>{teacher.last_name}</span>
          <span>{teacher.email}</span>
          {/* <span>remove</span> */}
        </li>
      ))}
    </ul>
  );
}
