import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {QuestionnaireService} from './index';
import {Question} from '../models';

@Injectable({
  providedIn: 'root'
})
export class InterviewService implements Resolve<null | HttpErrorResponse> {

  public item: number;
  public questions: Question[];
  constructor(private questionnaireService: QuestionnaireService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<null | HttpErrorResponse> {
    return Observable.create((observer: Observer<null | HttpErrorResponse>) => {
      this.item = route.params.item;
      this.questions = this.questionnaireService.interviewList[this.item].questions;
      observer.next(null);
      observer.complete();
    });
  }
}
