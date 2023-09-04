import { Class } from "../../domain/entities/Class";

class ClassAdapter {
	public async list({school_id, day}: {school_id: number; day: string}): Promise<Class[]> {
		let url;

		if (school_id) {
			url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${school_id}/classes/`;
		} else {
			url = `${process.env.NEXT_PUBLIC_API_URL}/classes/`;
		}

		const queryParams: string[] = [];
    if (day)
      queryParams.push(`day=${encodeURIComponent(day)}`);
   

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }


		const res = await fetch(url);
    const classEntity: Class[] = await res.json();

    return classEntity;
	}

	public async getClassById({class_id}: {class_id: number}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`);
		const thisClass: Class = await res.json();
		
		return thisClass
	}

	public async addClass({name, school_id, level, day}: {name: string, school_id: number, level: number, day: number[]}): Promise<Class> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, school: school_id, level: level, day: day }) 
		});
		const newClass: Class = await res.json();

		return newClass
	}

	public async deleteClass({class_id}: {class_id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`,{
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
	
	public async addClassTeacher({class_id, teacher_id}: {class_id: number, teacher_id: number}): Promise<Class>{
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`, { 
			method: 'PATCH', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ teacher: teacher_id }) 
		});
		const currentClass: Class = await res.json();
	

		return currentClass
	}
	
	public async deleteClassTeacher({class_id}: {class_id: number}): Promise<Class>{
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes/${class_id}/`, { 
			method: 'PATCH', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ teacher: null }) 
		});
		const currentClass: Class = await res.json();
	

		return currentClass
	}
		
}

export const classAdapter = new ClassAdapter();