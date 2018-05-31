import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    AngularFireAuth
  ]
})
export class AuthComponent {

  public authForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private fireBaseAuth: AngularFireAuth) {
    this.authForm = formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required,
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.required,
        ])
      ]
    });
  }

  auth() {
    const data = this.authForm.value;
    this.fireBaseAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then((user: firebase.User)  => {
        this.router.navigate(['/main']);
      }, error => {
        this.errorMessage = error.message;
      });
  }

  logout() {
    this.fireBaseAuth.auth.signOut().then( () => {
      this.router.navigate(['/auth']);
    });
  }
}
