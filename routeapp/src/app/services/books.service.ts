import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {Book} from '../models/Book';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { map, skip, takeLast, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksCollection: AngularFirestoreCollection<Book>;
  bookDoc: AngularFirestoreDocument<Book>;
  books: Observable<Book[]>;
  book: Observable<Book>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.booksCollection = this.afs.collection('books');
  }
  getBooks() {
    this.books = this.booksCollection.snapshotChanges().pipe(
      map(
        changes => { return changes.map(a => {
          const data = a.payload.doc.data() as Book;
          data.id = a.payload.doc.id;
          return data;
        });
        }
      ));
    return this.books;
  }
  getBookById(id: string) {
    return of(this.books);
    /*const book = this.books.find( iteratorBook => iteratorBook.id === id);
    return of(book);/**/
  }
  addBook(book: Book) {
    book.id = this.afs.createId();
    return this.booksCollection.add(book);
  }
  editBook(book: Book) {
    return this.booksCollection.doc(book.id).update(book);
  }
  deleteBook(id: string) {
    return this.booksCollection.doc(id).delete();
  }
}
