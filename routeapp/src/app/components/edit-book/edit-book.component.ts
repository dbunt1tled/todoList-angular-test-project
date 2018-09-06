import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;
  constructor(
    private _bookService: BooksService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,

  ) { }

  ngOnInit() {
    this.bookId = this._activatedRoute.snapshot.params['id'];
    this._bookService.getBookById(this.bookId).subscribe( (book: Book) => {
      this.book = book;
    });
  }
  editBook() {
    const updateBook = Object.assign({}, this.book);
    this._bookService.editBook(updateBook).subscribe(book => {
      if (book) {
        this._router.navigate(['/panel']);
      }
    });
  }
}
