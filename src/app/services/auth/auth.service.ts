import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, of} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {CustomUser} from '../../models/';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<CustomUser | null>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private router: Router) {

    this.user = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.db.object(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }),
        take(1)
      );
  }

  registration(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(credential => {
      return this.updateUser(credential.user);
    })
      .catch(error => this.handleError(error));
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(credential => {
      return this.updateUser(credential.user);
    })
      .catch(error => this.handleError(error));
  }


  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  private updateUser(authData) {
    const userData = new CustomUser(authData);
    const userRef: AngularFireObject<CustomUser> = this.db.object(`users/${authData.uid}`);
    userRef.valueChanges().pipe(
      take(1)
    ).subscribe(user => {
      if (user && user.roles) {
        this.router.navigate(['/questionnaire']);
      } else {
        const item: AngularFireList<CustomUser> = this.db.list(`users/`);
        item.set(authData.uid, userData);
        userRef.update(userData);
        this.router.navigate(['/questionnaire']);
      }
    });
  }

  private handleError(error: Error) {
    console.error(error);
  }
}
