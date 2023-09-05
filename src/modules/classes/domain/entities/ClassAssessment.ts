import { ClassEntity } from '@/src/modules/classes/domain/entities/ClassEntity';

export class ClassAssessment {
  constructor(
    public id: number,
    public class_id: number,
    public assessment_id: number,
    public class_entity?: ClassEntity,
    public assessment?: any, // TODO: change to Assessment when model created
  ) {}
}
