import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, Observer, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CustomUser} from '../models';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class UserIsAuthGuard implements CanActivate {

  user: Observable<CustomUser | boolean>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.user = this.afAuth.authState
        .pipe(
          switchMap(user => {
            if (user) {
              return this.db.object(`users/${user.uid}`).valueChanges();
            } else {
              return of(null);
            }
          })
        );
      this.user.subscribe(user => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigate(['/auth']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
