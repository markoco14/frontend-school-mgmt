type DataType = {
  id: number,
  data_type: number,
  description: string,
}

export class EvaluationAttribute {
  constructor(
    public id: number,
    public school_id: number,
    public name: string,
    public type: string,
    public data_type_id: number,
    public min_value?: number,
    public max_value?: number,
    public descriptions?: string[],
    public data_type?: DataType,
  ) {}
}

