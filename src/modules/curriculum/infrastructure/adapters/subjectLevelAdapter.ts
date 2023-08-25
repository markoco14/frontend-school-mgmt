import { SubjectLevel } from "../../domain/entities/SubjectLevel";


class SubjectLevelAdapter {

	public async listSchoolSubjectLevels({id}: {id: number}): Promise<SubjectLevel[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subject-levels/`);
		const levels: SubjectLevel[] = await res.json();

		return levels
	}

	public async addSubjectLevel({subject, level}: {subject: number, level: number}): Promise<SubjectLevel> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subject-levels/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ subject: subject, level: level }) 
		});
		const subjectLevel: SubjectLevel	 = await res.json();

		return subjectLevel

	}

	// public async deleteLevel({id}: {id:number}): Promise<any> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/${id}/`,{
	// 		method: 'DELETE'
	// 	});

	// 	return res
	// }
}

export const subjectLevelAdapter = new SubjectLevelAdapter();