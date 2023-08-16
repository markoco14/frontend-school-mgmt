import { Student } from "./Student";

export class PaginatedStudentList {
  constructor(
    public count: number,
    public next: string | null,
    public previous: string | null,
    public results: Student[],
  ) {}
}