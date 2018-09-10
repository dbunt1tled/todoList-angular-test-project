import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList;
  listCountries = [
    'ua', 'us', 'ng', 'ch',
  ];
  listCategories = [
    'entertaiment', 'health', 'science', 'sports', 'technology', 'business',
  ];
  currentCountry = this.listCountries[0];
  currentCategory = this.listCategories[0];

  constructor(
    private _newsService: NewsService,
  ) { }

  ngOnInit() {
    this._newsService.getNewsByCountryAndCategory(this.currentCountry, this.currentCategory).subscribe(news => {
      this.newsList = news;
      console.log(this.newsList);
    });
  }

}
