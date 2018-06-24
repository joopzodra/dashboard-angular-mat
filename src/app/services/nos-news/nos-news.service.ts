import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { flatMap, catchError } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NosNewsService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.production ? 'https://frontendjr.nldashboard/' : 'http://localhost:8000/dashboard';

  getNews() {
    return this.http.get<any>(this.baseUrl + '/nos-news')
  }
}
