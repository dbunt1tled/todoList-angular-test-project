import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiClient: string = environment.news_api;
  constructor(
    private _http: HttpClient,
  ) { }
  getNewsByCountryAndCategory(country: string, category: string) {
    return this._http.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.apiClient}`);
  }
  getNewsBySourceAndCategory(source: string) {
    return this._http.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${this.apiClient}`);
  }
  getSourceByCountry(country: string, category: string) {
    return this._http.get(`https://newsapi.org/v2/sources?category=${category}&country=${country}&apiKey=${this.apiClient}`);
  }
}
