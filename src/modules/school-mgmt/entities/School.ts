export class School {
  constructor(
    public name: string,
    public slug: string,
    public id: number,
    public owner?: number,
    public owner_id?: number,
  ) {}
}
