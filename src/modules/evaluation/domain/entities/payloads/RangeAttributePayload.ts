export class RangeAttributePayload {
  constructor(
	public name: string,
	public school_id: number,
	public data_type_id: number,
	public min_value: number,
	public max_value: number,
	public descriptions: { [key: string]: string }[] | null,
  ){}
};
