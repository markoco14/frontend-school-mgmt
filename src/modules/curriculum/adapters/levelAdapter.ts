import { Level } from "@/src/modules/curriculum/entities/Level";

class LevelAdapter {

	

	public async addLevel({name, school, order}: {name: string, school: number, order: number}): Promise<Level> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school: school, order: order }) 
		});
		const level: Level = await res.json();

		return level

	}

	public async deleteLevel({id}: {id:number}): Promise<any> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/${id}/`,{
			method: 'DELETE'
		});

		return res
	}
}

export const levelAdapter = new LevelAdapter();