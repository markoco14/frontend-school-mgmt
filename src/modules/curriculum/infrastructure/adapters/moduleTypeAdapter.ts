import { ModuleType } from "../../domain/entities/ModuleType";


class ModuleTypeAdapter {
  public async listSchoolModuleTypes({
    schoolId,
  }: {
    schoolId: number;
  }): Promise<ModuleType[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/module-types/`;

    const res = await fetch(url);
    const moduleTypeList: ModuleType[] = await res.json();

    return moduleTypeList;
  }
  
  public async add({schoolId, moduleName}: {schoolId: number, moduleName: string}): Promise<ModuleType> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/module-types/`;
  
    const res = await fetch(url, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: moduleName, school: schoolId }) 
		});
    const newModule: ModuleType = await res.json();
  
    return newModule;
    
  }

}

export const moduleTypeAdapter = new ModuleTypeAdapter();
