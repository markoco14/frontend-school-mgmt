import { SubjectLevel } from "../../domain/entities/SubjectLevel";


class SubjectLevelAdapter {

	public async listSchoolSubjectLevels({id}: {id: number}): Promise<SubjectLevel[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subject-levels/`);
		const levels: SubjectLevel[] = await res.json();

		return levels
	}

	// public async addLevel({name, school, order}: {name: string, school: number, order: number}): Promise<Level> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/`, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ name: name, school: school, order: order }) 
	// 	});
	// 	const level: Level	 = await res.json();

	// 	return level

	// }

	// public async deleteLevel({id}: {id:number}): Promise<any> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/${id}/`,{
	// 		method: 'DELETE'
	// 	});

	// 	return res
	// }
}

export const subjectLevelAdapter = new SubjectLevelAdapter();