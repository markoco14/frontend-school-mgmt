import { Assessment } from '../../domain/entities/Assessment';


class AssessmentAdapter {
  public async list({
    schoolId,
  }: {
    schoolId: number;
  }): Promise<Assessment[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/schools/${schoolId}/assessments/`;

    const res = await fetch(url);
    const assessmentList: Assessment[] = await res.json();

    return assessmentList;
  }
  
  // public async add({schoolId, typeName}: {schoolId: number, typeName: string}): Promise<AssessmentType> {
  //   let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/`;
  
  //   const res = await fetch(url, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ name: typeName, school: schoolId }) 
	// 	});
  //   const newAssessment: AssessmentType = await res.json();
  
  //   return newAssessment;
    
  // }

  // public async patch({typeId, typeName}: {typeId: number, typeName: string}): Promise<AssessmentType> {
  //   let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/${typeId}/`;
  
  //   const res = await fetch(url, { 
	// 		method: 'PATCH', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ name: typeName}) 
	// 	});
  //   const updatedAssessment: AssessmentType = await res.json();
  
  //   return updatedAssessment;
  // }

  // public async delete({typeId}: {typeId: number}): Promise<any> {
  //   let url = `${process.env.NEXT_PUBLIC_API_URL}/assessment-types/${typeId}/`;
  
  //   const res = await fetch(url, {
  //       method: "DELETE",
  //     });
  
  //   return res;
  // }

}

export const assessmentAdapter = new AssessmentAdapter();
