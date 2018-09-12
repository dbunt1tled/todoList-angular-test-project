import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList = [];
  listCountries = [
    'ua', 'us', 'ng', 'ch',
  ];
  listCategories = [
    'entertainment', 'health', 'science', 'sports', 'technology', 'business',
  ];
  listSources = [];
  currentSource = '';
  currentCountry = this.listCountries[0];
  currentCategory = this.listCategories[0];
  colorHeader = 'blue';
  constructor(
    private _newsService: NewsService,
  ) { }

  ngOnInit() {
    this.getNews();
    this.getSource();
  }
  onChangeCategory() {
    this.getNews();
  }
  onChangeCountry() {
    this.getSource();
    this.getNews();
  }
  onChangeSource() {
    this.getNewsBySource();
  }
  getNews() {
    this._newsService.getNewsByCountryAndCategory(this.currentCountry, this.currentCategory).subscribe(news => {
      this.newsList = news['articles'];
    });
  }
  getNewsBySource() {
    this._newsService.getNewsBySourceAndCategory(this.currentSource).subscribe(news => {
      this.newsList = news['articles'];
    });
  }
  getSource() {
    this._newsService.getSourceByCountry(this.currentCountry, this.currentCategory).subscribe(source => {
      this.listSources = source['sources'].length ? source['sources'] : [];
      this.currentSource = this.listSources.length ? this.listSources[0] : false;
    });
  }
}
