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

}

export const moduleTypeAdapter = new ModuleTypeAdapter();
