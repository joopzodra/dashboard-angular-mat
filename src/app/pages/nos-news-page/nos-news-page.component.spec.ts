import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NosNewsPageComponent } from './nos-news-page.component';
import { AppMaterialModule } from '../../app.material-module'
import { NosNewsService } from '../../services/nos-news/nos-news.service';
import { asyncData, asyncError } from '../../testing/async-observable-helpers';
import { newsItemsArray } from '../../testing/stub-news-items';
import { NewsItem } from '../../models/news-item';
import { ReplaceH2Pipe } from '../../pipes/replace-h2.pipe';

describe('NosNewsPageComponent', () => {
  let component: NosNewsPageComponent;
  let fixture: ComponentFixture<NosNewsPageComponent>;
  let nosNewsService: jasmine.SpyObj<Observable<NewsItem[]>>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    nosNewsService = jasmine.createSpyObj('NosNewsService', ['getPageNews']);
    (<any>nosNewsService).getPageNews.and.returnValue(asyncData(newsItemsArray));
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        // The RouterTestingModule is needed for the Location class, which is used in the component.
        RouterTestingModule
      ],
      declarations: [NosNewsPageComponent, ReplaceH2Pipe],
      providers: [{ provide: NosNewsService, useValue: nosNewsService }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosNewsPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    de = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows the expected number of news items', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const items = el.querySelectorAll('li');
      expect(items.length).toEqual(3);
      const item1 = items[0];
      const title = item1.querySelector('h3');
      const trailText = item1.querySelector('span');
      expect((<HTMLHeadingElement>title).textContent).toBe('title1');
      expect((<HTMLElement>trailText).textContent).toBe('trail text');
    });
  }));

  it('displays an error message when NosNewsService fails', async(() => {
    (<any>nosNewsService).getPageNews.and.returnValue(asyncError({ error: 'GuardianNewsService test failure' }));
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));

  it('on clicking on an news item, this item becomes the selected news item', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const selectedItem = el.querySelector('#selected-item-container h3');
      expect((<HTMLElement>selectedItem).textContent).toBe('title1');
      const newsItem2 = de.queryAll(By.css('#all-items-container li'))[1];
      newsItem2.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect((<HTMLElement>selectedItem).textContent).toBe('title2');
    });
  });

});
