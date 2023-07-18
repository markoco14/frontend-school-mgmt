import { Class } from "../../domain/entities/Class";
import { Level } from "../../domain/entities/Level";

class ClassAdapter {
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
	public async getClasses(): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async getClassesBySchoolId({id}: {id: number}): Promise<Class[]> {
		console.log(id)
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes-by-school-id/${id}/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async getClassById({id}: {id: number}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-class-by-id/${id}/`);
		const thisClass: Class = await res.json();
		
		return thisClass
	}

	public async addClass({name, school_id, level, day}: {name: string, school_id: number, level: number, day: number[]}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-class/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school_id: school_id, level: level, day: day }) 
		});
		const newClass: Class = await res.json();

		return newClass

	}


	public async deleteClassById({id}: {id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-class/${id}/`,{
			method: 'DELETE'
		})

		return response;
	}
 
}

export const classAdapter = new ClassAdapter();