import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OpenweathermapItem } from '../../models/openweathermap-item';

/*
 * The OpenweathermapDataService fectches openweathermap data from the backend.
 * The service on construction also fetches the names of the cities for which there is weather data available at the backend.
 */

@Injectable({
  providedIn: 'root'
})
export class OpenweathermapDataService {

  private baseUrl = environment.backendBaseUrl;
  private apiEndpoint = '/openweathermap';
  cityNames$: Observable<string[]>;

  constructor(private http: HttpClient) {
    const options = {
      params: new HttpParams()
        .set('city', 'listcitynames')
    };
    this.cityNames$ = this.http.get<string[]>(this.baseUrl + this.apiEndpoint, options)
      .pipe(
        catchError(() => of([]))
      );
  }

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
        .set('city', 'all')
    };
    return this.http.get<OpenweathermapItem[]>(this.baseUrl + this.apiEndpoint, options)
  }
}
