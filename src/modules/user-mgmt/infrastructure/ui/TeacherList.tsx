import { Teacher } from "../../domain/entities/Teacher";

export default function TeacherList({teachers}: {teachers: Teacher[]}) {

  return (
		<ul>
			{teachers?.map((teacher: any, index: number) => (
				<li key={index}>{teacher.first_name ? teacher.first_name : 'no name yet'} {teacher.email}</li>
			))}
		</ul>
  );
}
