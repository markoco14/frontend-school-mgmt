import { Level } from "./Level";
import { Subject } from "./Subject";

export class SubjectLevel {
  constructor(
    public id: number,
    public subject: number | Subject,
    public level: number | Level,
    public curriculum_description: string,
  ) {}
}
