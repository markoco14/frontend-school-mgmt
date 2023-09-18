export class TextAttributePayload {
  constructor(
    public name: string,
    public data_type_id: number,
    public school_id?: number,
  ) {}
}
