import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, Event, NavigationEnd} from '@angular/router';
import {Currency} from '../../models/currency';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CurrencyService} from '../../services/currency.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  userName: string;
  public isPublic = false;
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._router.events.subscribe( (e: Event) => {
      if (e instanceof  NavigationEnd) {
        this.isPublic = e.url.indexOf('panel') === -1;
      }
    });
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
