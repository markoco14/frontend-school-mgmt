import { Student } from "./Student";

export class PaginatedStudentResponse {
  constructor(
    public count: number,
    public next: string | null,
    public previous: string | null,
    public results: Student[],
  ) {}
}