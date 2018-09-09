import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  email: string;
  password: string;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    // Check Auth
    this._authService.checkAuth().subscribe( (auth) => {
      if (auth !== null) {
        this._router.navigate(['/panel']);
      }
    });
    this.loginForm =  this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get getField() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(user => {
      this._flashMessage.show('Success Login User ' + this.loginForm.controls.email.value,
        { cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
      this._router.navigate(['/panel']);
    }).catch(error => {
      this._flashMessage.show('Error Add User ' + this.loginForm.controls.email.value + '. ' + error.message,
        { cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
      console.log(error);
    });
  }

}
