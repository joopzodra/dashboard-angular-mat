import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news/news.service';

/*
 *  The backend serves news from the TECHNOLOGY section of the Guardian.
 */

@Injectable({
  providedIn: 'root'
})
export class GuardianNewsService extends NewsService {

  constructor(protected http: HttpClient) {
    super('/guardian-news', http);
  }
}
