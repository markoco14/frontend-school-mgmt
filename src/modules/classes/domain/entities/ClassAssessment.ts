import { Class } from '@/src/modules/classes/domain/entities/Class';

export class ClassAssessment {
  constructor(
    public id: number,
    public class_id: number,
    public assessment_id: number,
    public class_entity?: Class,
    public assessment?: any, // TODO: change to Assessment when model created
  ) {}
}
