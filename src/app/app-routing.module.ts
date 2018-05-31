import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {RegistrationComponent} from './registaration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
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
        component: AuthComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
