import { Level } from "@/src/modules/class-mgmt/domain/entities/Level";

class LevelAdapter {

	public async listSchoolLevels({id}: {id: number}): Promise<Level[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${id}/levels/`);
		const levels: Level[] = await res.json();

		return levels
	}

	public async addLevel({name, school}: {name: string, school: number}): Promise<Level> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/add`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school: school }) 
		});
		const level: Level = await res.json();

		return level

	}

	public async deleteLevel({id}: {id:number}): Promise<any> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/levels/${id}/delete/`,{
			method: 'DELETE'
		});

		return res
	}
}

export const levelAdapter = new LevelAdapter();