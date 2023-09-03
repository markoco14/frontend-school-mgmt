import { Student } from "./Student";

export class PaginatedStudentResponse {
  constructor(
    public count: number,
    public total_pages: number,
    public current_page: number,
    public per_page: number,
    public next: number | null,
    public previous: number | null,
    public results: Student[],
  ) {}
}