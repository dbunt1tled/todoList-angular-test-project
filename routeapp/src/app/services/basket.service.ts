import { Injectable } from '@angular/core';
import {Book} from '../models/Book';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  purchaseList = [];
  private clearSource = new BehaviorSubject(false);
  clearAllItemsEvent = this.clearSource.asObservable();
  private deleteSource = new BehaviorSubject('');
  deleteItemsEvent = this.deleteSource.asObservable();
  constructor() { }
  getItems() {
    return of(this.purchaseList);
  }
  addItem(book) {
    this.purchaseList.push(book);
    return of(book);
  }
  deleteItem(id) {
    for (let i = 0; i < this.purchaseList.length; i++) {
      if (id === this.purchaseList[i].id ) {
        const book = this.purchaseList[i];
        this.purchaseList.splice(i, 1);
        this.deleteSource.next(id);
        return of(book);
      }
    }
    return of(false);
  }
  deleteAll() {
    this.purchaseList.splice(0, this.purchaseList.length);
    this.clearSource.next(true);
  }
}
