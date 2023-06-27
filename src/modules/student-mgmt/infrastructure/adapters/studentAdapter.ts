import { Student } from './../../domain/entities/Student';

class StudentAdapter {
	public async getStudents(): Promise<Student[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students/`);
		const students: Student[] = await res.json();

		
		return students
	}
 
}

export const studentAdapter = new StudentAdapter();