export class EvaluationAttribute {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public minValue?: number,
    public maxValue?: number,
    public descriptions?: string[],
  ) {}
}

