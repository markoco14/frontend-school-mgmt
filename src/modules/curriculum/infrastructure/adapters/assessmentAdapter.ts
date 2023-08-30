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
  
  // public async add({
	// 	name, 
	// 	description, 
	// 	module, 
	// 	type, 
	// 	order, 
	// 	max_score, 
	// 	status 
	// }: {
	// 	name: string;
	// 	description: string;
	// 	module: number;
	// 	type: number;
	// 	order: number;
	// 	max_score: number;
	// 	status: number;
	// }): Promise<Assessment> {
  //   let url = `${process.env.NEXT_PUBLIC_API_URL}/assessments/`;
  
  //   const res = await fetch(url, { 
	// 		method: 'POST', 
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ 
	// 			name: name, 
	// 			description: description, 
	// 			module: module, 
	// 			type: type, 
	// 			order: order, 
	// 			max_score: max_score, 
	// 			status: status, 
	// 		}) 
	// 	});
  //   const newAssessment: Assessment = await res.json();
  
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
