import { Teacher } from "../../domain/entities/Teacher";

export default function TeacherList({teachers}: {teachers: Teacher[]}) {

  return (
		<ul className="bg-gray-100 rounded shadow-inner mb-4">
			{teachers?.map((teacher: any, index: number) => (
				<li key={index}
				className="p-2 hover:bg-gray-300"
				>{teacher.first_name ? teacher.first_name : 'no name yet'}</li>
			))}
		</ul>
  );
}
