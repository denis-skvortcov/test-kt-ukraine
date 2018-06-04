import {Component} from '@angular/core';
import {InterviewForm, Question} from '../models';
import {InterviewService} from '../services/';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {

  private item: number;
  public questions: Question[];
  public interviewForm: FormGroup;

  constructor(private interviewService: InterviewService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.updateModels();
      }
    });
  }

  private updateModels(): void {
    this.item = this.interviewService.item;
    this.questions = this.interviewService.questions;
    this.createForm();
  }

  private createForm(): void {
    this.interviewForm = InterviewForm.create(this.questions);
  }

  sendAnswers() {
    // const data = {};
    // this.interviewForm.value.forEach((answer, index) => {
    //   data[index] = answer;
    // });
    this.interviewService.sendAnswers(this.interviewForm.value);
  }
}
