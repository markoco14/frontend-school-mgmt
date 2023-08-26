import { Module } from "../../domain/entities/Module";

class ModuleAdapter {

	public async listSchoolModules({schoolId}: {schoolId: number}): Promise<Module[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/modules/`);
		const moduleList: Module[] = await res.json();

		return moduleList
	}

	public async addModule({name, order, subject_level, type}: {name: string, order: number, subject_level: number, type: number}): Promise<Module> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/modules/`, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, order: order, subject_level: subject_level, type: type, parent }) 
		});
		const new_module: Module = await res.json();

		return new_module

	}


	public async deleteModule({id}: {id:number}): Promise<any> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/modules/${id}/`,{
			method: 'DELETE'
		});

		return res
	}
}

export const moduleAdapter = new ModuleAdapter();