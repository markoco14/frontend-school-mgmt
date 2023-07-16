import { Class } from "../../domain/entities/Class";

class ClassAdapter {

	public async getClasses(): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async getClassById({id}: {id: number}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-class-by-id/${id}`);
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