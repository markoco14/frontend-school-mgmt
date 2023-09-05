import { ClassStudent } from "./ClassStudent";

export class ClassEntity {
  constructor(
    public id: number,
    public school: number,
    public name: string,
    public teacher: number,
		public class_list?: ClassStudent[],
    public day?: number[],
  ) {}
}
