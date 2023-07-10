import { ClassList } from './../../domain/entities/ClassList';

class ClassListAdapter {
	public async addStudentToClassList({class_id, student_id}: {class_id: number, student_id: number}): Promise<ClassList> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register-student-in-class/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ class_id: class_id, student_id: student_id }) 
		});
		const newClassList: ClassList = await res.json();

		return newClassList

	}
}

export const classListAdapter = new ClassListAdapter();