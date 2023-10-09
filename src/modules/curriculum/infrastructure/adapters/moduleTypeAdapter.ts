import { ModuleType } from "../../domain/entities/ModuleType";

class ModuleTypeAdapter {
  public async listSchoolModuleTypes({
    schoolId,
  }: {
    schoolId?: number;
  }): Promise<ModuleType[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/module-types/`;

    const queryParams: string[] = [];
    if (schoolId) queryParams.push(`school=${encodeURIComponent(schoolId)}`);
    
    if (queryParams.length) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url);
    const moduleTypeList: ModuleType[] = await res.json();

    return moduleTypeList;
  }

  public async add({
    schoolId,
    typeName,
  }: {
    schoolId: number;
    typeName: string;
  }): Promise<ModuleType> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/module-types/`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: typeName, school: schoolId }),
    });
    const newModule: ModuleType = await res.json();

    return newModule;
  }

  public async patch({
    typeId,
    typeName,
  }: {
    typeId: number;
    typeName: string;
  }): Promise<ModuleType> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/module-types/${typeId}/`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: typeName }),
    });
    const newModule: ModuleType = await res.json();

    return newModule;
  }

  public async delete({ typeId }: { typeId: number }): Promise<any> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/module-types/${typeId}/`;

    const res = await fetch(url, {
      method: "DELETE",
    });

    return res;
  }
}

export const moduleTypeAdapter = new ModuleTypeAdapter();
