import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BreakpointsService } from '../../services/breakpoints/breakpoints.service';
import { NewsItem } from '../../models/news-item';
import { NewsService } from '../../services/news/news.service';

export abstract class NewsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('newsItem') itemsList!: QueryList<ElementRef>;
  @ViewChild('pageContent') pageContent!: ElementRef;
  items: NewsItem[] = [];
  errorMessage = '';
  breakpointsSubscription!: Subscription;
  selectedItem: NewsItem | undefined;
  thumbnailClass = 'thumbnail-medium';
  columns = 1;
  activatedRouteParamsSubscription!: Subscription;

  constructor(
    protected breakpointsService: BreakpointsService,
    protected newsService: NewsService,
    protected location: Location,
    protected activatedRoute: ActivatedRoute,
    protected titleService: Title
  ) { }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }

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
        const selectedItemIndex = this.activatedRoute.snapshot.queryParams.itemindex || 0;
        this.selectItem(this.items[selectedItemIndex]);
      },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
        });

    this.activatedRouteParamsSubscription = this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.itemindex) {
        const selectedItem = this.items[+queryParams.itemindex];
        this.selectItem(selectedItem);
      }
    });
  }

  ngAfterViewInit() {
    (<HTMLElement>this.pageContent.nativeElement).addEventListener('focus', () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
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
        this.scrollToSelectedItem();
      }
    }
    else {
      this.selectedItem = item;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  scrollToSelectedItem() {
    // Using setTimeout to get element's offsetTop when it is fully displayed.
    setTimeout(() => {
      const elRef = this.itemsList.find(item => item.nativeElement.id === 'selected-item');
      const el = (<ElementRef<any>>elRef).nativeElement;
      window.scrollTo({ top: el.offsetTop, behavior: 'auto' })
    });
  }

}
