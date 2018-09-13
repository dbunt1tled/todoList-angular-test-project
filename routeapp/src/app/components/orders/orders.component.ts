import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Orders} from '../../models/Orders';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../models/currency';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders[];
  currentCurrency: Currency;
  constructor(
    private _orderService: OrderService,
    private _currencyService: CurrencyService,
  ) { }

  ngOnInit() {
    this._orderService.getOrders().subscribe((orders: Orders[]) => {
      this.orders = orders;
    });
    this._currencyService.selectedCurrency.subscribe( data => {
      this.currentCurrency = Object.create(data.find(obj => {
        return obj.isActive;
      }));
    });
  }
}
