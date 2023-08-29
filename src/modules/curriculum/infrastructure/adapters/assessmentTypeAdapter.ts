import { AssessmentType } from './../../domain/entities/AssessmentType';


class AssessmentTypeAdapter {
  public async list({
    schoolId,
  }: {
    schoolId: number;
  }): Promise<AssessmentType[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/assessment-types/`;

    const res = await fetch(url);
    const assessmentTypeList: AssessmentType[] = await res.json();

    return assessmentTypeList;
  }
  
  public async add({schoolId, typeName}: {schoolId: number, typeName: string}): Promise<AssessmentType> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/`;
  
    const res = await fetch(url, { 
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: typeName, school: schoolId }) 
		});
    const newAssessment: AssessmentType = await res.json();
  
    return newAssessment;
    
  }

  public async patch({typeId, typeName}: {typeId: number, typeName: string}): Promise<AssessmentType> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/${typeId}/`;
  
    const res = await fetch(url, { 
			method: 'PATCH', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: typeName}) 
		});
    const updatedAssessment: AssessmentType = await res.json();
  
    return updatedAssessment;
  }

  public async delete({typeId}: {typeId: number}): Promise<any> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/${typeId}/`;
  
    const res = await fetch(url, {
        method: "DELETE",
      });
  
    return res;
  }

}

export const assessmentTypeAdapter = new AssessmentTypeAdapter();
