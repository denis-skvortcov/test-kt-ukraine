import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, Observer} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {take} from 'rxjs/operators';
import {Interview} from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService implements Resolve<null | HttpErrorResponse> {

  interviewList: AngularFireList<Interview[]>;

  constructor(private db: AngularFireDatabase) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<null | HttpErrorResponse> {
    return Observable.create((observer: Observer<null | HttpErrorResponse>) => {
      forkJoin(
        this.getInterviewList()
      ).subscribe(([interviewList]) => {
        this.interviewList = interviewList;
        observer.next(null);
        observer.complete();
      }, (errorResponse: HttpErrorResponse) => {
        observer.error(errorResponse);
        observer.complete();
      });
    });
  }

  getInterviewList(): Observable<any> {
    return this.db.list('/Interviews/').valueChanges()
      .pipe(
        take(1)
      );
  }

}
