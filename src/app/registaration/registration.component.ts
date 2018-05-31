import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registaration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    AngularFireAuth
  ]
})
export class RegistrationComponent {

  public registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private fireBaseAuth: AngularFireAuth) {
    this.registrationForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      password: [
        null,
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.required
        ])
      ]
    });
  }

  public registration(): void {
    const data = this.registrationForm.value;
    this.fireBaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then( (user: firebase.User) => {
    });
  }
}
