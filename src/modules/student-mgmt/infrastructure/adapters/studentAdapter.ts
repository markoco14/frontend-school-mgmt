import { Student } from './../../domain/entities/Student';

class StudentAdapter {
	public async getStudents(): Promise<Student[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students/`);
		const students: Student[] = await res.json();
		
		return students
	}
	
	public async getStudentById({id}: {id: number}): Promise<Student> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-student/${id}/`);
		const student: Student = await res.json();
		
		return student;
	}

	public async getStudentBySchoolId({id}: {id: number}): Promise<Student[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students-by-school/${id}/`);
		const students: Student[] = await res.json();
		
		return students;
	}

	public async addStudent({firstName, lastName, age, school}: {firstName: string, lastName: string, age: number, school: number}): Promise<Student> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-student/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName, age: age, school: school }) 
		})
		const student: Student = await response.json();

		return student;
	}

	public async deleteStudentById({id}: {id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-student/${id}/`,{
			method: 'DELETE'
		})

		return response;
	}
 
}

export const studentAdapter = new StudentAdapter();