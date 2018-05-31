import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserClass} from '../models';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs/operators/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<UserClass> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {


    this.afAuth.authState
      .pipe(
        switchMap(auth => {
          if (auth) {
            return this.db.object('users/' + auth.uid);
          } else {
            return Observable.of(null);
          }
        })
      )
      .subscribe(user => {
        this.user.next(user);
      });
  }


  ///// SignIn - SignOut Process /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  //// Update user data ////

  /// updates database with user info after login
  /// only runs if user role is not already defined in database
  private updateUser(authData) {
    const userData = new UserClass(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref.take(1)
      .subscribe(user => {
        if (!user.role) {
          ref.update(userData);
        }
      });

  }
}
