import { Level } from '@/src/modules/curriculum/entities/Level';

export class LevelListResponse {
  constructor(
		public count: number,
		public prev: string | null,
		public next: string | null,
		public results: Level[],
  ) {}
}
