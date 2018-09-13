import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {FormsModule} from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {BooksService} from './services/books.service';
import {IdService} from './services/id.service';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { RegisterComponent } from './components/register/register.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {ValidatorsService} from './services/validators.service';
import { CurrencyComponent } from './components/currency/currency.component';
import {CurrencyService} from './services/currency.service';
import {BasketService} from './services/basket.service';
import { BasketComponent } from './components/basket/basket.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { CartComponent } from './components/cart/cart.component';
import {OrderService} from './services/order.service';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    AddBookComponent,
    EditBookComponent,
    AboutComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CustomDatePipe,
    CurrencyComponent,
    BasketComponent,
    ClientHomeComponent,
    CartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [BooksService, IdService, AuthService, ValidatorsService, CurrencyService, BasketService, OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
