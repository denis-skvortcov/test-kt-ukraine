import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionnaireComponent} from './questionnaire.component';
import {MaterialModule} from '../material/material.module';
import {InterviewComponent} from './interview/interview.component';
import {InterviewService, QuestionnaireService} from './services';
import {QuestionnaireRoutingModule} from './questionnaire-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    QuestionnaireRoutingModule,
  ],
  declarations: [
    QuestionnaireComponent,
    InterviewComponent
  ]
})
export class QuestionnaireModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: QuestionnaireModule,
      providers: [
        InterviewService,
        QuestionnaireService
      ]
    };
  }
}
