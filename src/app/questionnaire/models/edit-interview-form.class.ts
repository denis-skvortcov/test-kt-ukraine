import {Question} from './question.class';
import {FormBuilder, Validators} from '@angular/forms';

const formBuilder = new FormBuilder();

export class EditInterviewForm {

  static create(questionList: Question[]) {
    const formData = [];
    questionList.forEach((question) => {
      formData.push(formBuilder.group(
        {
          value: [question.value, Validators.required],
          type: [question.type, Validators.required],
          mask: [question.mask]
        }
      ));
    });

    return formData;
  }
}
