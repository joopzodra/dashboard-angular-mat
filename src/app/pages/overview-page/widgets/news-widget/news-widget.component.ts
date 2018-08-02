import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Router, NavigationExtras } from '@angular/router';

import { NewsItem } from '../../../../models/news-item';

/*
 *  The NewsWidgetComponent is an abstact class. It is extended in the NosNewsWidgetComponent and the GuardianNewsWidgetComponent.
 *  On initiation it receives news items from the backend.
 *  Note that it does not have a Component decorator, since it isn't used as component on its own: it doesn't need metadata for a template or styles.
 */

export abstract class NewsWidgetComponent implements OnInit {

  items$: Observable<NewsItem[] | {}> = of();
  errorMessage = '';

  constructor(protected newsService: NewsService, protected router: Router) {}

  ngOnInit() {
    this.items$ = this.newsService.getWidgetNews()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error
          return of()
        })
      )
  }

}