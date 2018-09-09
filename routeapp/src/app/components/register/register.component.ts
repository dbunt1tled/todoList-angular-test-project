import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  minSymbols = 6;

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
    this.registerForm =  this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      confirmPassword: [''],
    }, {validator: this.checkPasswords });
  }
  get getField() { return this.registerForm.controls; }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._authService.emailSignUp(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
      .then(user => {
        console.log(user);
        this._flashMessage.show('Success Add User ' + this.registerForm.controls.email.value,
          { cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
        this._router.navigate(['/panel']);
      }).catch(error => {
      this._flashMessage.show('Error Add User ' + this.registerForm.controls.email.value + '. ' + error.message,
        { cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000 });
        console.log(error);
    });
  }

}
