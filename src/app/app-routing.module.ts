import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {RegistrationComponent} from './registaration/registration.component';
import {UserIsAuthGuard} from './guards';
import {QuestionnaireService} from './questionnaire/services';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {path: '', redirectTo: '/questionnaire', pathMatch: 'full'},
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'questionnaire',
        loadChildren: './questionnaire/questionnaire.module#QuestionnaireModule',
        resolve: [QuestionnaireService],
        canActivate: [UserIsAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
