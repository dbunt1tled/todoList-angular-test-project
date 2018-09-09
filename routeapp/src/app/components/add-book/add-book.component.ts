import { Component, OnInit } from '@angular/core';
import {Book, BookLinks} from '../../models/Book';
import {BooksService} from '../../services/books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidatorsService} from '../../services/validators.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book;
  addBookForm: FormGroup;
  links: FormArray;
  submitted = false;
  minSymbols = 6;
  constructor(
    private _fb: FormBuilder,
    private _flashMessage: FlashMessagesService,
    private _bookService: BooksService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _validator: ValidatorsService,
  ) { }

  ngOnInit() {
    this.book = { name: '', description: '', author: '', date: '', price: '0.00', links: [{link: '', type: ''}] };
    this.addBookForm =  this._fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      author: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      description: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      price: ['', [Validators.required, this._validator.numberValidator]],
      links: this._fb.array([ this.createItem() ])
    });
  }
  createItem(): FormGroup {
    return this._fb.group({
      type: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      link: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
    });
  }
  addItem(): void {
    this.links = this.addBookForm.get('links') as FormArray;
    this.links.push(this.createItem());
  }
  delItem(index: number) {
    this.links = this.addBookForm.get('links') as FormArray;
    this.links.removeAt(index);
  }
  get getField() { return this.addBookForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.addBookForm.invalid) {
      return;
    }
    let bookLinks: BookLinks[];
    bookLinks = this.addBookForm.controls.links.value;
    const book: Book = {
      name: this.addBookForm.controls.name.value,
      author: this.addBookForm.controls.author.value,
      description: this.addBookForm.controls.description.value,
      date: new Date(), /* (new Date().getTime() / 1000).toString(), /**/
      price: this.addBookForm.controls.price.value,
      links: bookLinks,
    };
    this._bookService.addBook(book).then(newBook => {
      console.log(newBook);
      this._flashMessage.show('Success Add Book ' + this.addBookForm.controls.name.value,
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      this._router.navigate(['/panel']);
    }).catch(error => {
      this._flashMessage.show('Error Add Book ' + this.addBookForm.controls.name.value + '. ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      console.log(error);
    });
  }
}
