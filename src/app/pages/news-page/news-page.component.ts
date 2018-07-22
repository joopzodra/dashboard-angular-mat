import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { NewsItem } from '../../models/news-item';
import { NewsService } from '../../services/news/news.service';

export abstract class NewsPageComponent implements OnInit, OnDestroy {

  items$!: Observable<NewsItem[] | {}>;
  errorMessage = '';
  breakpointsSubscription!: Subscription;
  selectedItem: NewsItem | undefined;
  thumbnailClass = 'thumbnail-medium';
  columns = 1;
  @ViewChildren('newsItem') itemsList!: QueryList<ElementRef>

  constructor(protected breakpointsService: BreakpointsService, protected newsService: NewsService) {}

  ngOnInit() {
    this.breakpointsSubscription = this.breakpointsService.breakpoints$.subscribe(value => {
      let screenSize;
      if (value.large) {
        screenSize = 'large';
      } else if (value.medium) {
        screenSize = 'medium';
      } else if (value.tablet) {
        screenSize = 'tablet'
      } else {
        screenSize = 'small';
      }

      if (screenSize === 'medium' || screenSize === 'large') {
        this.thumbnailClass = 'thumbnail-large';
        this.columns = 2;
      } else {
        this.thumbnailClass = 'thumbnail-medium';
        this.columns = 1;
      }
    });

    this.items$ = this.newsService.getPageNews()
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error
          return of()
        }),
        tap((items: NewsItem[]) => {
          if (this.columns === 2) {
            this.selectedItem = items[0];
          }
        })
      );
  }

  ngOnDestroy() {
    this.breakpointsSubscription.unsubscribe();
  }

  toggleBodyText(item: NewsItem) {
    if (this.selectedItem === item) {
      this.selectedItem = undefined;
    } else {
      this.selectedItem = item;
      if (this.columns === 1) {
        setTimeout(() => {
          const elRef = this.itemsList.find(item => item.nativeElement.id === 'selected-item');
          const el = (<ElementRef<any>>elRef).nativeElement;
          window.scrollTo({ top: el.offsetTop, behavior: 'auto' })
        })
      }
    }
  }

}
