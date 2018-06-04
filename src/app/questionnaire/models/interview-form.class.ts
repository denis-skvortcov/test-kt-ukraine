import {Question} from './question.class';
import {FormBuilder, Validators} from '@angular/forms';

const formBuilder = new FormBuilder();

export class InterviewForm {

  static create(questionList: Question[], answers: string[]) {
    const formData = {};
    questionList.forEach((question, index) => {
      const answer = answers && answers[index] ? answers[index] : null;
      const pattern = question.mask ? Validators.pattern(question.mask) : null;
      formData[index] = [answer, pattern];
    });

    return formBuilder.group(formData);
  }
}
