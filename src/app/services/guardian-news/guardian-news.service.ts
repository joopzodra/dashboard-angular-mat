import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardianNewsService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.production ? 'https://frontendjr.nldashboard/' : 'http://localhost:8000/dashboard';

  getNews() {
    const section = 'technology';
    const options = {
      params: new HttpParams()
        .set('section', section)
        .set('page-size', '3')
    };
    return this.http.get<any>(this.baseUrl + '/guardian-news', options)
      .pipe(
        flatMap(response => {
          const urls = response.response.results.map((item: any) => item.apiUrl);
          const itemsObservables = urls.map((url: string) => this.getSingle(url));
          return forkJoin(itemsObservables);
        })
      )
  }

  getSingle(url: string) {
    const fields = 'trailText,thumbnail';
    const options = {
      params: new HttpParams()
        .set('single-url', url)
        .set('show-fields', fields)
    }
    return this.http.get<any>(this.baseUrl + '/guardian-single', options)
  }
}
