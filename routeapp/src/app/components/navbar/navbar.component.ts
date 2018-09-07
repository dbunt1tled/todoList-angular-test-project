import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  userName: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._authService.checkAuth().subscribe( (auth) => {
      if (auth !== null) {
        this.userName = auth.email;
        this.isLogin = true;
      } else {
        this.userName = '';
        this.isLogin = false;
      }
    });
  }
  logout() {
    this._authService.logout().then( () =>{
      this._router.navigate(['/login']);
    });
  }

}
