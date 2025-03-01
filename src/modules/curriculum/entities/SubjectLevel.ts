import { Subject } from "@/src/modules/curriculum/entities/Subject";
import { Level } from "@/src/modules/curriculum/levels/entities/Level";

export class SubjectLevel {
  constructor(
    public id: number,
    public subject: Subject,
    public level: Level,
    public curriculum_description: string,
  ) {}
}
