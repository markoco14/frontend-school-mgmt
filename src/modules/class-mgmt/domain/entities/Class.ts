import { ClassList } from "./ClassList";

export class Class {
  constructor(
    public id: number,
    public school_id: number,
    public name: string,
		public class_list?: ClassList[],
    public day?: number[],
  ) {}
}
