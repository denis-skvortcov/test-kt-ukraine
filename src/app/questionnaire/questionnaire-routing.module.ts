import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnaireComponent} from './questionnaire.component';
import {InterviewComponent} from './interview/interview.component';
import {AnswersService, InterviewService} from './services';
import {AnswersComponent} from './answers/answers.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'interview/0'
      },
      {
        path: 'interview/:item',
        component: InterviewComponent,
        resolve: {
          setup: InterviewService
        }
      },
      {
        path: 'answers',
        component: AnswersComponent,
        resolve: {
          setup: AnswersService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule {
}
