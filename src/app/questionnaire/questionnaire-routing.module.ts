import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnaireComponent} from './questionnaire.component';
import {InterviewComponent} from './interview/interview.component';
import {InterviewService} from './services';

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
        runGuardsAndResolvers: 'always',
        resolve: {
          setup: InterviewService
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
