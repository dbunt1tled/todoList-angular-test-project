import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable, Observer} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import { map, skip, takeLast, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private _authService: AuthService,
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
  ) {}
  canActivate(): Observable<boolean> {
    return this._authService.checkAuth().pipe(map( auth => {
      if (!auth) {
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }));
  }
}
