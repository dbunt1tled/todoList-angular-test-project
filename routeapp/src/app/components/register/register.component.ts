import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    // Check Auth
    this._authService.checkAuth().subscribe( (auth) => {
      if (auth !== null) {
        this._router.navigate(['/panel']);
      }
    });
  }

  onSubmit() {
    this._authService.login(this.email, this.password).then(user => {
      this._router.navigate(['/panel']);
    }).catch(error => {
      console.log(error);
    });
  }

}
