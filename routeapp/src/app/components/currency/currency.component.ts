import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {Currency} from '../../models/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  selectedCurrency: Currency;
  currencyList: Currency[];
  constructor(
    private _currencyService: CurrencyService,
  ) {}

  ngOnInit() {
      this._currencyService.selectedCurrency.subscribe( data => {
      this.currencyList = data.slice();
      this.selectedCurrency = Object.create(data.find( obj => {
        return obj.isActive;
      }));
    });
  }
  updateCurrency() {
    this._currencyService.selectCurrency( this.selectedCurrency.name );
  }
}
