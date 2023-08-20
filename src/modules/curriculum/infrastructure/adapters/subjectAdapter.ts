import { Subject } from "../../domain/entities/Subject";
import { SubjectListResponse } from "../../domain/entities/SubjectListResponse";

class SubjectAdapter {

	public async listSchoolSubjects({schoolId}: {schoolId: number}): Promise<SubjectListResponse> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/?school=${schoolId}`);
		const subjectListResponse: SubjectListResponse = await res.json();

		return subjectListResponse
	}

	public async addSubject({name, school}: {name: string, school: number}): Promise<Subject> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school: school }) 
		});
		const level: Subject = await res.json();

		return level

	}

	public async deleteSubject({id}: {id:number}): Promise<any> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects/${id}/`,{
			method: 'DELETE'
		});

		return res
	}
}

export const subjectAdapter = new SubjectAdapter();