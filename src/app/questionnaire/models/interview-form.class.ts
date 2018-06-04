import {Question} from './question.class';
import {FormBuilder, Validators} from '@angular/forms';

const formBuilder = new FormBuilder();

export class InterviewForm {

  static create(data: Question[]) {

    data.forEach((question, index) => {
      this[index] = ['', question.mask ? Validators.pattern(question.mask) : null];
    });

    return formBuilder.group(this);
  }
}
