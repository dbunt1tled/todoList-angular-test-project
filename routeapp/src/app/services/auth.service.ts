import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
  ) {}

  login(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });
  }
  emailSignUp(email: string, password: string ) {
    return  new Promise( (resolve, reject) => {
      this._angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });
  }
  checkAuth() {
    return this._angularFireAuth.authState;
  }
  logout() {
    return this._angularFireAuth.auth.signOut();
  }
}
