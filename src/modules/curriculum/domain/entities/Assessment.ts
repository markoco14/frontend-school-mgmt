export class Assessment {
  constructor(
    public id: number,
    public name: string,
    public description: string,
		public module: number,
		public type: number,
		public order: number,
		public max_score: number,
		public status: number,
  ) {}
}