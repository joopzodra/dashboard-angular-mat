import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news/news.service';

@Injectable({
  providedIn: 'root'
})
export class NosNewsService extends NewsService {

  constructor(protected http: HttpClient) {
    super('/nos-news', http);
  }
}
