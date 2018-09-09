import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {Book} from '../../models/Book';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../models/currency';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  books: Book[];
  searchText: string;
  searchResult: Book[] = [];
  currentCurrency: Currency;
  constructor(
    private _bookService: BooksService,
    private _flashMessage: FlashMessagesService,
    private _currencyService: CurrencyService,
  ) { }

  ngOnInit() {
    this._bookService.getBooks().subscribe( (books: Book[]) => {
      this.books = books;
    });
    this._currencyService.selectedCurrency.subscribe( data => {
      this.currentCurrency = Object.create(data.find(obj => {
        return obj.isActive;
      }));
    });
  }
  deleteBook(id: string) {
    this._bookService.deleteBook(id).then(newBook => {
      console.log(newBook);
      this._flashMessage.show('Success Delete Book ',
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000});
    }).catch(error => {
      this._flashMessage.show('Error Delete Book ' + '. ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      console.log(error);
    });
  }
  searchBook() {
    this.searchResult = this.books.filter( book => {
      return ((book.name.toLowerCase().indexOf(this.searchText) !== -1) || (book.description.toLowerCase().indexOf(this.searchText) !== -1));
    });
  }
}
