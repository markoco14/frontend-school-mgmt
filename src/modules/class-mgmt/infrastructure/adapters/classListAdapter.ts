import { ClassList } from './../../domain/entities/ClassList';

class ClassListAdapter {
	public async addClassStudent({class_id, student_id}: {class_id: number, student_id: number}): Promise<ClassList> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/students/add/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ class_id: class_id, student_id: student_id }) 
		});
		const newClassList: ClassList = await res.json();

		return newClassList
	}

	public async deleteClassStudent({class_id, student_id}: {class_id: number, student_id: number}): Promise<ClassList> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/students/${student_id}/delete/`, { 
			method: 'DELETE', 
		});
		const newClassList: ClassList = await res.json();

		return newClassList
	}
}

export const classListAdapter = new ClassListAdapter();