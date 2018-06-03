import {Question} from './question.class';

export class Interview {
  public readonly date: Date;
  public readonly dateEnd: Date;
  public readonly name: string;
  public readonly questions: Question[];

  constructor(data: {
    date: Date,
    dateEnd: Date,
    name: string,
    questions: Question[],
  }) {
    this.date = data.date;
    this.dateEnd = data.dateEnd;
    this.name = data.name;
    this.questions = data.questions.map(questions => new Question(questions));
  }

}
