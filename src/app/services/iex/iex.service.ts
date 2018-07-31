import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IexDayItem, IexLongtermItem } from '../../models/iex-items';

@Injectable({
  providedIn: 'root'
})
export class IexService {
  baseUrl = environment.backendBaseUrl;
  apiEndpoint = '/iex';
  iexDayDataFresh = false;
  iexDayData$ = new BehaviorSubject<IexDayItem[]>([]);
  iexLongtermDataCache: IexLongtermItem[] = [];
  iexLongtermData$ = new BehaviorSubject<IexLongtermItem | undefined>(undefined);

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
    if (this.iexDayDataFresh) {
      return;
    } else {
      this.http.get<IexDayItem[]>(this.baseUrl + this.apiEndpoint, options)
        .subscribe(data => {
          this.iexDayDataFresh = true;
          setTimeout(() => this.iexDayDataFresh = false, 120000); // After 2 minutes, the day data isn't fresh anymore.
          this.iexDayData$.next(data);
        });
    }
  }

  getLongtermData(companySymbol: string) {
    const companyData = this.iexLongtermDataCache.find(item => item.month.symbol === companySymbol);
    if (companyData) {
      this.iexLongtermData$.next(companyData);
      return;
    }
    const options = {
      params: new HttpParams()
        .set('company', companySymbol)
    };
    this.http.get<IexLongtermItem>(this.baseUrl + this.apiEndpoint, options)
    .subscribe(data => {
      this.iexLongtermDataCache.push(data);
      this.iexLongtermData$.next(data);
    })
  }
}
