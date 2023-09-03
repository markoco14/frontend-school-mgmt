import { Level } from "@/src/modules/curriculum/domain/entities/Level";
import { LevelListResponse } from "../../domain/entities/LevelListResponse";

class LevelAdapter {

	public async listSchoolLevels({school_id,}: {school_id?: number;}): Promise<Level[]> {
		let url;
		if (school_id) {
			url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/levels/`;
		} else {
			url = `${process.env.NEXT_PUBLIC_API_URL}/levels/`;
		}

		const res = await fetch(url);
		const levels: Level[] = await res.json();

		return levels
	}

	public async paginatedList({school_id, page, per_page}: {school_id?: number; page: number; per_page?: number}): Promise<LevelListResponse> {
		let url;
		if (school_id) {
			url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/levels/`;
		} else {
			url = `${process.env.NEXT_PUBLIC_API_URL}/levels/`;
		}

		const queryParams: string[] = [];
    if (page) queryParams.push(`page=${encodeURIComponent(page)}`);
    if (per_page) queryParams.push(`per_page=${encodeURIComponent(per_page)}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

		const res = await fetch(url);
		const levels: LevelListResponse = await res.json();

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