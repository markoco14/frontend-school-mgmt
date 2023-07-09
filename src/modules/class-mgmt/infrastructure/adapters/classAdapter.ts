import { Class } from "../../domain/entities/Class";

class ClassAdapter {
	public async getClasses(): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes/`);
		const classes: Class[] = await res.json();

		return classes
	}

	public async addClass({className, schoolId}: {className: string, schoolId: number}): Promise<Class> {
		console.log('hitting endpoint but backend is not set up')
		return 
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-class/`);
		const newClass: Class[] = await res.json();

		return newClass
	}
}

export const classAdapter = new ClassAdapter();