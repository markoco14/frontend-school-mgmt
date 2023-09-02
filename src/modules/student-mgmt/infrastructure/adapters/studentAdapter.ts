import { PaginatedStudentResponse } from '../../domain/entities/PaginatedStudentResponse';
import { Student } from './../../domain/entities/Student';

class StudentAdapter {

	public async listSchoolStudents({id, page}: {id: number, page: number}): Promise<PaginatedStudentResponse> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${id}/students/?page=${page}`);
		const students: PaginatedStudentResponse = await res.json();
		
		return students;
	}

	public async listClassStudents({id}: {id: number}): Promise<Student[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${id}/students/`);
		const students: Student[] = await res.json();
		
		return students
	}
	
	public async getStudent({id}: {id: number}): Promise<Student> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}/get/`);
		const student: Student = await res.json();
		
		return student;
	}

	public async addStudent({firstName, lastName, age, schoolId}: {firstName: string, lastName: string, age: number, schoolId: number}): Promise<Student> {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/add/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ first_name: firstName, last_name: lastName, age: age, school_id: schoolId }) 
		})
		const student: Student = await response.json();

		return student;
	}

	public async deleteStudentById({id}: {id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${id}/delete/`,{
			method: 'DELETE'
		})

		return response;
	}
 
}

export const studentAdapter = new StudentAdapter();