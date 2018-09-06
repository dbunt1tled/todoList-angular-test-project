import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FlashMessagesModule} from 'angular2-flash-messages';
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

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    AddBookComponent,
    EditBookComponent,
    AboutComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlashMessagesModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [BooksService, IdService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
