import { Class } from "../../domain/entities/Class";

class ClassAdapter {
	public async getClasses(): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async addClass({className, schoolId}: {className: string, schoolId: number}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-class/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: className, school_id: schoolId }) 
		});
		const newClass: Class = await res.json();

		return newClass

	}
}

export const classAdapter = new ClassAdapter();