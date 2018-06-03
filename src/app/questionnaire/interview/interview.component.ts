import {Component} from '@angular/core';
import {Question} from '../models';
import {InterviewService} from '../services/';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {

  public item: number;
  public questions: Question[];

  constructor(private interviewService: InterviewService) {
    this.item = this.interviewService.item;
    this.questions = this.interviewService.questions;
  }
}
