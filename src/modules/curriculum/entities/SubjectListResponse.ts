import { Subject } from '@/src/modules/curriculum/entities/Subject';

export class SubjectListResponse {
  constructor(
		public count: number,
		public prev: string | null,
		public next: string | null,
		public results: Subject[],
  ) {}
}
