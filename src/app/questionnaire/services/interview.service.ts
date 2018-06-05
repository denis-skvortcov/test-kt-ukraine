import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, Observer} from 'rxjs';
import {QuestionnaireService} from './index';
import {Question} from '../models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from 'firebase';
import {AuthService} from '../../services';
import {CustomUser} from '../../models';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService implements Resolve<null | HttpErrorResponse> {

  public item: number;
  public questions: Question[];
  private userAuth: User;
  public answersRef: AngularFireObject<string[]>;
  public lastInterviewIndex: number;
  public answers: string[];
  public customUser: CustomUser;

  constructor(private questionnaireService: QuestionnaireService,
              private afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService,
              private db: AngularFireDatabase) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<null | HttpErrorResponse> {
    return Observable.create((observer: Observer<null | HttpErrorResponse>) => {
      this.afAuth.authState.subscribe(user => {
        this.userAuth = user;
        this.item = +route.params.item;
        this.lastInterviewIndex = this.questionnaireService.lastInterviewIndex;
        if (this.item > this.lastInterviewIndex) {
          this.questions = [];
          this.answers = [];
          this.authService.user.subscribe(customUser => {
            this.customUser = customUser;
            observer.next(null);
            observer.complete();
          });
        } else {
          this.questions = this.questionnaireService.interviewList[this.item].questions;
          this.answersRef = this.db.object(`answers/${this.item}/${this.userAuth.uid}`);
          forkJoin([
            this.answersRef.valueChanges()
              .pipe(
                take(1)
              ),
            this.authService.user
          ])
            .subscribe(([answers, customUser]) => {
              this.answers = answers;
              this.customUser = customUser;
              observer.next(null);
              observer.complete();
            });
        }
      });
    });
  }

  sendAnswers(data): void {
    const interview: AngularFireList<string[]> = this.db.list(`answers/${this.item}/`);
    interview.set(this.userAuth.uid, data);
    this.answersRef.update(data);
    const nextInterview = this.item + 1;
    this.router.navigate(['/questionnaire/interview', nextInterview > this.lastInterviewIndex ? 0 : nextInterview]);
  }

  saveQuestion(index: number, question): void {
    const questionRef = this.db.object(`/Interviews/${this.item}/questions`);
    questionRef.update({[index]: question});
  }

  deleteQuestion(index: number): void {
    const questionRef = this.db.object(`/Interviews/${this.item}/questions/${index}`);
    questionRef.remove();
    this.updateQuestions(index);
  }

  updateQuestions(index: number): void {
    const questionsRef = this.db.object(`/Interviews/${this.item}/questions`);
    this.questions.splice(index, 1);
    questionsRef.remove();
    questionsRef.set(this.questions);
    this.questionnaireService.updateInterviewList();
  }
}
