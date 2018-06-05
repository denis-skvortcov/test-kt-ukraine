import {Component, ViewEncapsulation} from '@angular/core';
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
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public interviewList: Interview[];
  public lastInterviewIndex: number;
  public customUser: CustomUser;
  public newInterviewControl: FormControl;
  public editNameInterviewForm: FormControl;
  public currentIndexEditInterview: number;

  constructor(private auth: AuthService,
              private breakpointObserver: BreakpointObserver,
              private questionnaireService: QuestionnaireService) {
    this.interviewList = this.questionnaireService.interviewList;
    this.lastInterviewIndex = this.questionnaireService.lastInterviewIndex;
    this.customUser = this.questionnaireService.customUser;
  }

  addNewInterview() {
    this.lastInterviewIndex++;
    this.newInterviewControl = new FormControl('', {
      validators: Validators.required
    });
  }

  createFormEditNameInterview(index) {
    this.currentIndexEditInterview = index;
    this.editNameInterviewForm = new FormControl(this.interviewList[index].name, {
      validators: Validators.compose([Validators.minLength(2), Validators.required])
    });
  }

  createInterview() {
    this.questionnaireService.createInterview(this.lastInterviewIndex, this.newInterviewControl.value).subscribe(interviewList => {
      this.interviewList = interviewList;
      this.newInterviewControl = undefined;
    });
  }

  editNameInterview() {
    const value = this.editNameInterviewForm.value;
    this.questionnaireService.updateNameInterview(this.currentIndexEditInterview, value).subscribe(interviewList => {
      this.interviewList = interviewList;
      this.currentIndexEditInterview = null;
      this.editNameInterviewForm = undefined;
    });
  }

  deleteInterview() {
    this.questionnaireService.deleteInterview(this.currentIndexEditInterview).then(() => {
      // this.interviewList.splice(this.currentIndexEditInterview, 1);
      this.currentIndexEditInterview = null;
      this.editNameInterviewForm = undefined;
      this.lastInterviewIndex--;
    });
  }

  logout() {
    this.auth.logout();
  }
}
