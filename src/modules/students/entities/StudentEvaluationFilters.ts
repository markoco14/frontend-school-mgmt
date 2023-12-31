export class StudentEvaluationFilters {
	constructor(
		public id?: number,
		public evaluation_type?: number,
		public student_id?: number,
		public author_id?: number,
		public date?: string,
		public evaluation_attribute_id?: number,
		public evaluation_value?: number | string,
		public class_id?: number,
		public subject_id?: number,
		public level_id?: number,
	){}
}
