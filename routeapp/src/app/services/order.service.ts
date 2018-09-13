import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Orders} from '../models/Orders';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection: AngularFirestoreCollection<Orders>;
  orders: Observable<Orders[]>;
  order: Observable<Orders>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.ordersCollection = this.afs.collection('orders');
  }
  addNewOrder(order: Orders) {
    order.id = this.afs.createId();
    return this.ordersCollection.add(order);
  }
  getOrders() {
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(
        changes => { return changes.map(a => {
          const data = a.payload.doc.data() as Orders;
          data.id = a.payload.doc.id;
          return data;
        });
        }
      ));
    return this.orders;
  }
  changeStatus(order: Orders){}
}
