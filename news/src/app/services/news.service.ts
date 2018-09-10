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
}
