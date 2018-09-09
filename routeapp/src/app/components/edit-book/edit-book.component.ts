import { Component, OnInit } from '@angular/core';
import {Book, BookLinks} from '../../models/Book';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsService} from '../../services/validators.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;
  editBookForm: FormGroup;
  links: FormArray;
  submitted = false;
  minSymbols = 6;
  constructor(
    private _fb: FormBuilder,
    private _bookService: BooksService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _validator: ValidatorsService,
    private _flashMessage: FlashMessagesService,
  ) {
    this.book = { name: '', description: '', author: '', date: '', price: '0.00', links: [{link: '', type: ''}] };
    this.editBookForm =  this._fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      author: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      description: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      price: ['', [Validators.required, this._validator.numberValidator]],
      links: this._fb.array([ this.createItem() ])
    });
  }

  ngOnInit() {
    this.bookId = this._activatedRoute.snapshot.params['id'];
    this._bookService.getBooks().subscribe( (books: Book[]) => {
      this.book = books.find( iteratorBook => iteratorBook.id === this.bookId);
      if (this.book.links.length > 1) {
        for (let i = 0; i < (this.book.links.length - 1); i++) {
          this.addItem();
        }
      }
      this.editBookForm.reset(this.book);
    });
  }
  createItem(): FormGroup {
    return this._fb.group({
      type: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      link: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
    });
  }
  addItem(): void {
    this.links = this.editBookForm.get('links') as FormArray;
    this.links.push(this.createItem());
  }
  delItem(index: number) {
    this.links = this.editBookForm.get('links') as FormArray;
    this.links.removeAt(index);
  }
  get getField() { return this.editBookForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editBookForm.invalid) {
      return;
    }
    let bookLinks: BookLinks[];
    bookLinks = this.editBookForm.controls.links.value;
    const editBook: Book = {
      id: this.bookId,
      name: this.editBookForm.controls.name.value,
      author: this.editBookForm.controls.author.value,
      description: this.editBookForm.controls.description.value,
      date: new Date(), /* (new Date().getTime() / 1000).toString(), /**/
      price: this.editBookForm.controls.price.value,
      links: bookLinks,
    };
    this._bookService.editBook(editBook).then(currentBook => {
      console.log(currentBook);
      this._flashMessage.show('Success Edit Book ' + this.editBookForm.controls.name.value,
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      this._router.navigate(['/panel']);
    }).catch(error => {
      this._flashMessage.show('Error Edit Book ' + this.editBookForm.controls.name.value + '. ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      console.log(error);
    });
  }
}
