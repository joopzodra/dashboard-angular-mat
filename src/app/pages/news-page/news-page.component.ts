import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Location } from '@angular/common';

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { NewsItem } from '../../models/news-item';
import { NewsService } from '../../services/news/news.service';

export abstract class NewsPageComponent implements OnInit, OnDestroy {

  @ViewChildren('newsItem') itemsList!: QueryList<ElementRef>
  items: NewsItem[] = [];
  errorMessage = '';
  breakpointsSubscription!: Subscription;
  selectedItem: NewsItem | undefined;
  thumbnailClass = 'thumbnail-medium';
  columns = 1;

  constructor(protected breakpointsService: BreakpointsService, protected newsService: NewsService, protected location: Location) { }

  ngOnInit() {
    this.breakpointsSubscription = this.breakpointsService.breakpoints$.subscribe(screenSize => {
      if (screenSize.medium || screenSize.large) {
        this.thumbnailClass = 'thumbnail-large';
        this.columns = 2;
      } else {
        this.thumbnailClass = 'thumbnail-medium';
        this.columns = 1;
      }
    });

    this.newsService.getPageNews()
      .pipe(
        tap((items: NewsItem[]) => {
          if (this.columns === 2) {
            this.selectedItem = items[0];
          }
        })
      )
      .subscribe((items: NewsItem[]) => {
        this.items = items;
        this.afterNavigation();
      },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
        });
  }

  ngOnDestroy() {
    this.breakpointsSubscription.unsubscribe();
  }

  selectItem(item: NewsItem) {
    if (this.columns === 1) {
      if (this.selectedItem === item) {
        this.selectedItem = undefined;
      } else {
        this.selectedItem = item;
        // Using setTimeout to get element's offsetTop when it is fully displayed.
        setTimeout(() => {
          const elRef = this.itemsList.find(item => item.nativeElement.id === 'selected-item');
          const el = (<ElementRef<any>>elRef).nativeElement;
          window.scrollTo({top: el.offsetTop , behavior: 'auto'})
        });
      }
    }
    else {
      this.selectedItem = item;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  afterNavigation() {
    // If the url which navigated to this component contains a query param, replace the url by an url without query param.
    const urlFragments = this.location.path().split('?');
    const itemIndexQueryParam = urlFragments[1];
    if (itemIndexQueryParam) {
      const itemIndex = +itemIndexQueryParam.split('=')[1];
      this.selectedItem = this.items[itemIndex];
      this.location.replaceState(urlFragments[0]);
    }
  }
}
