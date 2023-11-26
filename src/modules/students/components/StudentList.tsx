import { Student } from "@/src/modules/students/entities/Student";
import ListContainer from "../../core/components/ListContainer";

type Props = {
	students: Student[];
}

export default function StudentList(props: Props) {

	return(
		<ListContainer>
			{props.students?.map((student: Student, index: number) => (
				<li 
					key={index}
					className="p-2 rounded-md hover:bg-blue-200 flex justify-between"
				>
					{student.first_name} {student.last_name}
				</li>
			))}
		</ListContainer>
	)
}