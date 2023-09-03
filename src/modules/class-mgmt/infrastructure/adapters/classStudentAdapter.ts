import { ClassStudent } from "../../domain/entities/ClassStudent";

class ClassStudentAdapter {
	public async list({class_id}: {class_id: number}): Promise<ClassStudent[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-students/?school_class=${class_id}`);
		const ClassStudent: ClassStudent[] = await res.json();
		
		return ClassStudent
	}

	public async add({class_id, student_id}: {class_id: number, student_id: number}): Promise<ClassStudent> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-students/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ class_id: class_id, student_id: student_id }) 
		});
		const newClassStudent: ClassStudent = await res.json();

		return newClassStudent
	}

	public async delete({class_id, student_id}: {class_id: number, student_id: number}): Promise<ClassStudent> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/students/${student_id}/delete/`, { 
			method: 'DELETE', 
		});
		const newClassStudent: ClassStudent = await res.json();

		return newClassStudent
	}
}

export const classStudentAdapter = new ClassStudentAdapter();