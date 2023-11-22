import { Level } from "@/src/modules/curriculum/entities/Level";

class LevelAdapter {

	public async listSchoolLevels({school_id,}: {school_id?: number;}): Promise<Level[]> {
		let url;
		if (school_id) {
			url = `${process.env.NEXT_PUBLIC_API_URL}/levels/`;
		} else {
			url = `${process.env.NEXT_PUBLIC_API_URL}/levels/`;
		}

		const queryParams: string[] = [];
    if (school_id) queryParams.push(`school=${encodeURIComponent(school_id)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

		const res = await fetch(url);
		const levels: Level[] = await res.json();

		return levels
	}


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