import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../models/currency';
import {BehaviorSubject} from 'rxjs';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems = [];
  currentCurrency: Currency;
  constructor(
    private _basketService: BasketService,
    private _flashMessage: FlashMessagesService,
    private _currencyService: CurrencyService,
  ) { }

  ngOnInit() {
    // get all Basket Items
    this._basketService.getItems().subscribe( items => {
      this.basketItems = items;
    });
    this._currencyService.selectedCurrency.subscribe( data => {
      this.currentCurrency = Object.create(data.find(obj => {
        return obj.isActive;
      }));
    });
    this._basketService.clearAllItemsEvent.subscribe( response => {
      if (response) {
        this.basketItems.splice(0, this.basketItems.length);
      }
    });
    this._basketService.deleteItemsEvent.subscribe( id => {
      if (id !== '') {
        this.basketItems.map( item => {
          if (item.id !== id) {
            return item;
          }
        });
      }
    });
  }
  clearBasket() {
    this._basketService.deleteAll();
  }
  deleteBookFromBasket(id) {
    this._basketService.deleteItem(id).subscribe( book => {
      if (book) {
        this._flashMessage.show('Success Delete Book ' + book.name + ' from Basket',
          {cssClass: 'alert-warning', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      } else {
        this._flashMessage.show('Error Delete Book from Basket',
          {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      }
    });
  }
}
