import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Interview} from './models';
import {QuestionnaireService} from './services';
import {AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public interviewList: AngularFireList<Interview[]>;

  constructor(private auth: AuthService,
              private breakpointObserver: BreakpointObserver,
              private questionnaireService: QuestionnaireService) {
    this.interviewList = this.questionnaireService.interviewList;
  }

  ngOnInit() {
  }

  // modefiy() {
  //   //   this.afAuth.authState.subscribe(authData => {
  //   //     const userData = new User(authData);
  //   //     const userRef: AngularFireObject<User> = this.db.object(`users/${authData.uid}`);
  //   //     userRef.valueChanges().pipe(
  //   //       take(1)
  //   //     ).subscribe(user => {
  //   //       if (user && user.roles && user.roles.manager) {
  //   //         const item: AngularFireList<boolean> = this.db.list(`users/41XwGsjNwpgvvH2hFWe7ljMKViX2/roles/`);
  //   //         item.set('manager', true);
  //   //       }
  //   //     });
  //   //
  //   //   });
  //   // }

  logout() {
    this.auth.logout();
  }
}
