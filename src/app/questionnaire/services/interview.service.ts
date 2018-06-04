import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {QuestionnaireService} from './index';
import {Question} from '../models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class InterviewService implements Resolve<null | HttpErrorResponse> {

  public item: number;
  public questions: Question[];
  private user: User;
  public answersRef: AngularFireObject<string[]>;

  constructor(private questionnaireService: QuestionnaireService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<null | HttpErrorResponse> {
    return Observable.create((observer: Observer<null | HttpErrorResponse>) => {
      this.afAuth.authState.subscribe(user => {
        this.user = user;
        this.item = route.params.item;
        this.questions = this.questionnaireService.interviewList[this.item].questions;
        this.answersRef = this.db.object(`answers/${this.item}/${this.user.uid}`);
        this.answersRef.valueChanges();
      });

      observer.next(null);
      observer.complete();
    });
  }

  sendAnswers(data) {
    const interview: AngularFireList<string[]> = this.db.list(`answers/${this.item}/`);
    interview.set(this.user.uid, data);
    this.answersRef.update(data);
    this.router.navigate([`${this.item + 1}`]);
  }
}
