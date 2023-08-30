import { Assessment } from "./Assessment";
import { SubjectLevel } from "./SubjectLevel";

export class Module {
  constructor(
    public id: number,
    public name: string,
		public description: string,
    public order: number,
    public subject_level: number | SubjectLevel,
    public type: number,
    public parent: number,
    public assessments?: Assessment[],
  ) {}
}
