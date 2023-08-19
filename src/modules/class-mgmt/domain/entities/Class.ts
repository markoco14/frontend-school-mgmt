import { ClassList } from "./ClassList";

export class Class {
  constructor(
    public id: number,
    public school: number,
    public name: string,
    public teacher: number,
		public class_list?: ClassList[],
    public day?: number[],
  ) {}
}
