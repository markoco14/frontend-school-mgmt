export class Module {
  constructor(
    public id: number,
    public name: string,
		public description: string,
    public order: number,
    public subject_level: number,
    public type: number,
    public parent: number,
  ) {}
}
