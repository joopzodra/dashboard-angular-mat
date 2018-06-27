import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { OpenweathermapItem } from '../../models/openweathermap-item';

@Injectable({
  providedIn: 'root'
})
export class OpenweathermapService {
  baseUrl = environment.backendBaseUrl;
  apiEndpoint = '/openweathermap';

  constructor(private http: HttpClient) { }

  getWidgetWeather(city: string) {
    const options = {
      params: new HttpParams()
        .set('city', city)
    };
    return this.http.get<OpenweathermapItem>(this.baseUrl + this.apiEndpoint, options)
  }

  getPageWeather() {
    const options = {
      params: new HttpParams()
        .set('page-size', '20')
        .set('include-body', 'true')
    };
    return this.http.get<OpenweathermapItem[]>(this.baseUrl + this.apiEndpoint, options)
  }

}
