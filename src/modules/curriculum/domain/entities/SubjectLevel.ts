import { Level } from "./Level";
import { Subject } from "./Subject";

export class SubjectLevel {
  constructor(
    public id: number,
    public subject: Subject,
    public level: Level,
    public curriculum_description: string,
  ) {}
}
