import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    // Check Auth
    if (this._authService.checkAuth()) {
      //this._router.navigate(['/panel']);
    }
  }

  onSubmit() {
    this._authService.login(this.email, this.password).then(user => {
      this._router.navigate(['/panel']);
    }).catch(error => {
      console.log(error);
    });
  }

}
