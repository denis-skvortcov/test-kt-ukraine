import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './auth/auth.component';

import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {RegistrationComponent} from './registaration/registration.component';
import {AngularFireFunctionsModule} from 'angularfire2/functions';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AuthService} from './services';
import {QuestionnaireModule} from './questionnaire/questionnaire.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
    QuestionnaireModule.forRoot(),
  ],
  exports: [
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
