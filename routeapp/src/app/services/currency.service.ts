import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Currency} from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency = [
    {
      name: 'USD',
      isActive: true,
      coefficient: 1,
    },
    {
      name: 'GBP',
      isActive: false,
      coefficient: 1.5,
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 1.3,
    },
  ];
  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  selectedCurrency = this.currencySource.asObservable();
  constructor() { }
  selectCurrency(name: string) {
    this.currency = this.currency.map( currency => {
      currency.isActive = (currency.name === name);
      return currency;
    });
    // Уведомляем всех об изменении валюты
    this.currencySource.next(this.currency);
  }
}
