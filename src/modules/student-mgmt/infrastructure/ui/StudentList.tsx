import { Student } from "@/src/modules/student-mgmt/domain/entities/Student";

type Props = {
	students: Student[];
}

export default function StudentList(props: Props) {

	return(
		<ul className="flex flex-col gap-2">
			{props.students?.map((student: Student, index: number) => (
				<li 
					key={index}
					className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
				>
					{student.first_name} {student.last_name}
				</li>
			))}
		</ul>
	)
}