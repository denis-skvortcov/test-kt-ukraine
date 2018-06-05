import {Component} from '@angular/core';
import {EditInterviewForm, InterviewForm, Question} from '../models';
import {InterviewService} from '../services/';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  public editInterviewForm: FormGroup[];
  public customUser: CustomUser;
  public types: { name: string, value: string }[];

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
    if (this.interviewService.questions.length && !this.customUser.roles.manager) {
      this.createForm();
    } else if (this.interviewService.questions.length && this.customUser.roles.manager) {
      this.createEditInterviewForm();
      this.types = [
        {name: 'Email', value: 'email'},
        {name: 'Текст', value: 'text'},
        {name: 'Число', value: 'number'},
        {name: 'Дата', value: 'date'},
        {name: 'Цвет', value: 'color'}
      ];
    }

  }

  private createForm(): void {
    this.interviewForm = InterviewForm.create(this.questions, this.answers);
  }

  private createEditInterviewForm(): void {
    this.editInterviewForm = EditInterviewForm.create(this.questions);
  }

  public sendAnswers(): void {
    this.interviewService.sendAnswers(this.interviewForm.value);
  }

  public addNewQuestion(): void {
    this.editInterviewForm.push(
      this.formBuilder.group(
        {
          value: ['' , Validators.required],
          type: [null, Validators.required],
          mask: ['']
        }
      )
    );
  }

  saveQuestion(index: null, form: FormGroup) {
    this.interviewService.saveQuestion(index, form.value);
  }

  deleteQuestion(index) {
    this.interviewService.deleteQuestion(index);
    this.editInterviewForm.splice(index, 1);
  }
}
