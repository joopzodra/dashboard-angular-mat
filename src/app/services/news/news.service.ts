import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NewsItem } from '../../models/news-item';

/*
 *  The NewsService is an abstact base class. The NosNewsService and the GuardianNewsService extend this class.
 *  The service fetches news items from the backend.
 */

export abstract class NewsService {
  baseUrl = environment.production ? 'https://frontendjr.nldashboard/' : 'http://localhost:8000/dashboard';

  constructor(private apiEndpoint: string, protected http: HttpClient) { }

  getWidgetNews() {
    const options = {
      params: new HttpParams()
        .set('page-size', '3')
    };
    return this.http.get<NewsItem[]>(this.baseUrl + this.apiEndpoint, options)
  }

  getPageNews() {
    const options = {
      params: new HttpParams()
        .set('page-size', '20')
        .set('include-body', 'true')
    };
    return this.http.get<NewsItem[]>(this.baseUrl + this.apiEndpoint, options)
  }
}
