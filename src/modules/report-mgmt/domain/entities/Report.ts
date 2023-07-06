export class Report {
  constructor(
		public id: number,
    public content: string,
    public is_complete: boolean,
    public student_id: number,
  ) {}
}
