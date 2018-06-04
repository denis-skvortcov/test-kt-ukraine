import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Interview} from './models';
import {QuestionnaireService} from './services';
import {CustomUser} from '../models';
import {FormControl, Validators} from '@angular/forms';

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

  public interviewList: Interview[];
  public lastInterviewIndex: number;
  public customUser: CustomUser;
  public newInterviewControl: FormControl;

  constructor(private auth: AuthService,
              private breakpointObserver: BreakpointObserver,
              private questionnaireService: QuestionnaireService) {
    this.interviewList = this.questionnaireService.interviewList;
    this.lastInterviewIndex = this.questionnaireService.lastInterviewIndex;
    this.customUser = this.questionnaireService.customUser;
  }

  ngOnInit() {
  }

  // modefiy() {
  //   //   this.afAuth.authState.subscribe(authData => {
  //   //     const userData = new CustomUser(authData);
  //   //     const userRef: AngularFireObject<CustomUser> = this.db.object(`users/${authData.uid}`);
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

  addNewInterview() {
    this.newInterviewControl = new FormControl('', {
      validators: Validators.required
    });
  }

  createInterview() {
    this.questionnaireService.createInterview(this.lastInterviewIndex + 1, this.newInterviewControl.value).subscribe(interviewList => {
      this.interviewList = interviewList;
      this.newInterviewControl = undefined;
    });
  }

  logout() {
    this.auth.logout();
  }
}
