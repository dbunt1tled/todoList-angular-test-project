import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: { name: '', description: '', author: '', link: [{link: '', type: ''}] };
  constructor(
    private _bookService: BooksService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,

  ) { }

  ngOnInit() {
  }
  addBook() {
    /*const updateBook = Object.assign({}, this.book);
    this._bookService.editBook(updateBook).subscribe(book => {
      if (book) {
        this._router.navigate(['/panel']);
      }
    });/**/
  }

}
