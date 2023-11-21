import { SubjectLevel } from "@/src/modules/curriculum/entities/SubjectLevel";
import { Assessment } from "./Assessment";

export class Module {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public order: number,
    public subject_level: SubjectLevel,
    public type: number,
    public parent: number,
    public assessments?: Assessment[],
  ) {}
}
