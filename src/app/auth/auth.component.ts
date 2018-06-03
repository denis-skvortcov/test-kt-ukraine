import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  public authForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) {
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

  login() {
    const data = this.authForm.value;
    this.auth.login(data.email, data.password);
  }
}
