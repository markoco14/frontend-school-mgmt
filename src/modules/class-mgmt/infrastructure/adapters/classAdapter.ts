import { Class } from "../../domain/entities/Class";

class ClassAdapter {
	public async getClasses(): Promise<Class[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-classes/`);
		const classes: Class[] = await res.json();

		return classes
	}
}

export const classAdapter = new ClassAdapter();