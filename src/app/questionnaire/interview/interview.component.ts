import {Component} from '@angular/core';
import {InterviewForm, Question} from '../models';
import {InterviewService} from '../services/';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomUser} from '../../models';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {

  private item: number;
  public questions: Question[];
  public answers: string[];
  public interviewForm: FormGroup;
  public customUser: CustomUser;

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
    this.answers = this.interviewService.answers;
    this.customUser = this.interviewService.customUser;
    if (this.interviewService.questions.length) {
      this.createForm();
    }
  }

  private createForm(): void {
    this.interviewForm = InterviewForm.create(this.questions, this.answers);
  }

  sendAnswers() {
    this.interviewService.sendAnswers(this.interviewForm.value);
  }
}
