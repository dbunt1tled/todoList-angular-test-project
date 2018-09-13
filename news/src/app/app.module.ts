import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NewsService} from './services/news.service';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomColorDirective } from './directives/custom-color.directive';
import { ShowDescriptionDirective } from './directives/show-description.directive';
import { CustomIfDirective } from './directives/custom-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomColorDirective,
    ShowDescriptionDirective,
    CustomIfDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NewsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
