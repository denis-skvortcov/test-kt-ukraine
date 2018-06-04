import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, Observer} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {map, take} from 'rxjs/operators';
import {Interview} from '../models';
import {AuthService} from '../../services';
import {CustomUser} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService implements Resolve<null | HttpErrorResponse> {

  public interviewList: Interview[];
  public lastInterviewIndex: number;
  public customUser: CustomUser;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<null | HttpErrorResponse> {
    return Observable.create((observer: Observer<null | HttpErrorResponse>) => {
      forkJoin(
        this.getInterviewList()
      ).subscribe(([interviewList]) => {
        this.interviewList = interviewList;
        this.lastInterviewIndex = this.interviewList.length - 1;
        this.authService.user.subscribe(customUser => {
          this.customUser = customUser;
          observer.next(null);
          observer.complete();
        });
      }, (errorResponse: HttpErrorResponse) => {
        observer.error(errorResponse);
        observer.complete();
      });
    });
  }

  getInterviewList(): Observable<Interview[]> {
    return this.db.list('/Interviews/').valueChanges()
      .pipe(
        map((interviews: Interview[]) => interviews.map(interview => new Interview(interview))),
        take(1)
      );
  }

  createInterview(interviewIndex: number, interviewName: string): Observable<Interview[]> {
    const interviews = this.db.list('/Interviews/');
    interviews.set(`${interviewIndex}`, {
      name: interviewName,
      date: new Date(),
      dateEnd: new Date(),
      questions: [
        {
          value: 'Добавьте первый',
          type: 'text',
          mask: ''
        }
      ]
    });
    return this.getInterviewList();
  }

}
