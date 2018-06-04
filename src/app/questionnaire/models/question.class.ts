export class Question {
  public readonly value: string;
  public readonly mask: string;
  public readonly type: string;

  constructor(data: {
    value: string,
    mask: string,
    type: string
  }) {
    this.value = data.value;
    this.mask = data.mask ? data.mask : '';
    this.type = data.type;
  }
}
