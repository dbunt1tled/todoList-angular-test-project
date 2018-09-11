import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {CurrencyService} from '../../services/currency.service';
import {BasketService} from '../../services/basket.service';
import {Book, BookLinks} from '../../models/Book';
import {Currency} from '../../models/currency';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsService} from '../../services/validators.service';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  checkoutList = [];
  currentCurrency: Currency;
  isCustomerInfoVisible = false;
  customerInfoForm: FormGroup;
  minSymbols = 6;
  submitted = false;
  totalSum = 0;
  constructor(
    private _flashMessage: FlashMessagesService,
    private _currencyService: CurrencyService,
    private _basketService: BasketService,
    private _router: Router,
    private _fb: FormBuilder,
    private _validator: ValidatorsService,
    private _orderService: OrderService,
  ) { }

  ngOnInit() {
    this._basketService.getItems().subscribe( (items) => {
      if (!items.length) {
        this._router.navigate(['/']);
      }
      this.checkoutList = items;
      this.totalSum = this.checkoutList.reduce( (sum, item) => sum + parseFloat(item.summ), 0);
    });
    this._currencyService.selectedCurrency.subscribe( data => {
      this.currentCurrency = Object.create(data.find(obj => {
        return obj.isActive;
      }));
    });
    this.customerInfoForm =  this._fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, this._validator.telephoneValidator]],
      address: ['', [Validators.required, Validators.minLength(this.minSymbols)]],
    });
  }
  get getField() { return this.customerInfoForm.controls; }
  deleteItemFromBasket(id: string) {
    this._basketService.deleteItem(id).subscribe( book => {
      if (book) {
        this._flashMessage.show('Success Delete Book ' + book.name + ' from Basket',
          {cssClass: 'alert-warning', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      } else {
        this._flashMessage.show('Error Delete Book from Basket',
          {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      }
    });
  }
  onChangeItemCount(item) {
    item.summ = (item.price * item.count);
    console.log(this.checkoutList);
    this.totalSum = this.checkoutList.reduce( (sum, product) => sum + parseFloat(product.summ), 0);
  }
  onSubmit() {
    this.submitted = true;
    if (this.customerInfoForm.invalid) {
      return;
    }
    const order =  {
      name: this.customerInfoForm.controls.name.value,
      email: this.customerInfoForm.controls.email.value,
      telephone: this.customerInfoForm.controls.telephone.value,
      address: this.customerInfoForm.controls.address.value,
      products: this.checkoutList,
      total: this.totalSum.toString(),
      date: new Date(),
      status: 'processing',
    };
    this._orderService.addNewOrder(order).then(newOrder => {
      console.log(newOrder);
      this._flashMessage.show('Success create Order.' ,
        {cssClass: 'alert-success', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      this._router.navigate(['/']);
    }).catch(error => {
      this._flashMessage.show('Error Create Order. ' + error.message,
        {cssClass: 'alert-danger', closeOnClick: true, showCloseBtn: true, timeout: 3000});
      console.log(error);
    });
  }
}
