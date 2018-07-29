import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IexDayItem, IexLongtermItem } from '../../models/iex-items';

@Injectable({
  providedIn: 'root'
})
export class IexService {
  baseUrl = environment.backendBaseUrl;
  apiEndpoint = '/iex';

  constructor(private http: HttpClient) { }

  getWidgetData() {
    const options = {
      params: new HttpParams()
        .set('company', 'widget')
    };
    return this.http.get<IexDayItem[]>(this.baseUrl + this.apiEndpoint, options); 
  }

  getDayData() {
    const options = {
      params: new HttpParams()
        .set('company', 'all')
    };
    return this.http.get<IexDayItem[]>(this.baseUrl + this.apiEndpoint, options);    
  }

  getLongtermData(companySymbol: string) {
    const options = {
      params: new HttpParams()
        .set('company', companySymbol)
    };
    return this.http.get<IexDayItem[]>(this.baseUrl + this.apiEndpoint, options);
  }
}
