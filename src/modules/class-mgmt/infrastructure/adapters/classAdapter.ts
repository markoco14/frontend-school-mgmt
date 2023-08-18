import { Class } from "../../domain/entities/Class";
import { Level } from "../../domain/entities/Level";

class ClassAdapter {
	public async getClassById({id}: {id: number}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${id}/get/`);
		const thisClass: Class = await res.json();
		
		return thisClass
	}

	public async addClass({name, school_id, level, day}: {name: string, school_id: number, level: number, day: number[]}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/add/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school_id: school_id, level: level, day: day }) 
		});
		const newClass: Class = await res.json();

		return newClass
	}

	public async deleteClass({id}: {id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${id}/delete/`,{
			method: 'DELETE'
		})

		return response;
	}

	public async listSchoolClasses({id}: {id: number}): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${id}/classes/`);
		const classes: Class[] = await res.json();
		
		return classes
	}

	public async listSchoolTodayClasses({school_id, date}: {school_id: number, date: number}): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/classes/day/${date}/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async getLevels(): Promise<Level[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-levels/`);
		const levels: Level[] = await res.json();

		return levels
	}
	public async getLevelsBySchoolId({id}: {id: number}): Promise<Level[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-levels-by-school-id/${id}/`);
		const levels: Level[] = await res.json();

		return levels
	}

	public async addLevel({name, school}: {name: string, school: number}): Promise<Level> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-level/`, { 
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-level/${id}/`,{
			method: 'DELETE'
		});

		return res
	}
}

export const classAdapter = new ClassAdapter();