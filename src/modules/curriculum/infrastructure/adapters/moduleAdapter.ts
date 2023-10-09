import { Module } from "../../domain/entities/Module";

class ModuleAdapter {
  public async listSchoolModules({
    schoolId,
    subjectName,
    levelOrder,
  }: {
    schoolId?: number;
    subjectName?: string;
    levelOrder?: number;
  }): Promise<Module[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/modules/`;

    const queryParams: string[] = [];
    if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);
    if (subjectName) queryParams.push(`subject=${encodeURIComponent(subjectName)}`);
    if (levelOrder) queryParams.push(`level=${levelOrder}`);

    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const moduleList: Module[] = await res.json();

    return moduleList;
  }

  public async add({name, type, order, subjectLevel}: {name: string, type:number, order: number, subjectLevel: number}): Promise<Module> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/modules/`
    const res = await fetch(url, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, type: type, order: order, subject_level: subjectLevel }) 
		});
		const newModule: Module = await res.json();
    
    return newModule
  }

  public async delete({ id }: { id: number }): Promise<any> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/modules/${id}/`,
      {
        method: "DELETE",
      }
    );

    return res;
  }
}

export const moduleAdapter = new ModuleAdapter();
