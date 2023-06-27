import { Student } from './../../domain/entities/Student';

class StudentAdapter {
	public async getStudents(): Promise<Student[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-students/`);
		const students: Student[] = await res.json();

		
		return students
	}

	public async addStudent({firstName, lastName, age}: {firstName: string, lastName: string, age: number}): Promise<Student> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-student/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName, age: age }) 
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