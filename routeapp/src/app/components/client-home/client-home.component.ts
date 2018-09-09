import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {Currency} from '../../models/currency';
import {BooksService} from '../../services/books.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CurrencyService} from '../../services/currency.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  books: Book[] = [];
  searchText: string;
  searchResult: Book[] = [];
  currentCurrency: Currency;
  constructor(
    private _bookService: BooksService,
    private _flashMessage: FlashMessagesService,
    private _currencyService: CurrencyService,
    private _basketService: BasketService,
  ) { }

  ngOnInit() {
    this._bookService.getBooks().subscribe( (books: Book[]) => {
      this.books = books;
      this._basketService.getItems().subscribe( basketItems => {
        if (basketItems.length) {
          this.books.forEach(book => {
            if (basketItems.find( obj => obj.id === book.id )) {
              book.isAddBasket = true;
            }
          });
        }
      });
    });
    this._currencyService.selectedCurrency.subscribe( data => {
      this.currentCurrency = Object.create(data.find(obj => {
        return obj.isActive;
      }));
    });
    this._basketService.clearAllItemsEvent.subscribe( response => {
      if (response) {
        this.books.forEach(book => {
          book.isAddBasket = false;
        });
      }
    });
    this._basketService.deleteItemsEvent.subscribe( id => {
      if (id !== '') {
        this.books.forEach( item => {
          if (item.id === id) {
            item.isAddBasket = false;
          }
        });
      }
    });
  }
  searchBook() {
    this.searchResult = this.books.filter(book => {
      return ((book.name.toLowerCase().indexOf(this.searchText) !== -1) || (book.description.toLowerCase().indexOf(this.searchText) !== -1));
    });
  }
  addBookToBasket(book: Book, currency: Currency) {
    const newBasketItem = {
      id: book.id,
      price: book.price,
      /*currency: currency,/**/
      name: book.name,
      summ: book.price,
      count: 1,
    };
    this._basketService.addItem(newBasketItem).subscribe( item => {
      this._flashMessage.show('Success Add Book ' + item.name + ' to Basket',
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000});
    });
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
