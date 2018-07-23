import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppMaterialModule } from '../../../app.material-module'
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { GuardianNewsService } from '../../../services/guardian-news/guardian-news.service';
import { GuardianNewsWidgetComponent } from './guardian-news-widget.component';
import { NewsItem } from '../../../models/news-item';

describe('GuardianNewsWidgetComponent', () => {
  let component: GuardianNewsWidgetComponent;
  let fixture: ComponentFixture<GuardianNewsWidgetComponent>;
  let el: HTMLElement;
  let guardianNewsService: jasmine.SpyObj<{}>;
  let routerSpy: jasmine.SpyObj<{}>;

  const newsItem: NewsItem = {
    title: 'stub title',
    trailText: 'stub trail text',
    thumbnail: '',
    body: 'stub body text'
  }
  const newsItemsArray = Array(3).fill(newsItem);

  beforeEach(() => {
    guardianNewsService = jasmine.createSpyObj('GuardianNewsService', ['getWidgetNews']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [GuardianNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: GuardianNewsService, useValue: guardianNewsService },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(GuardianNewsWidgetComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // Don't call this without providing spy with returnValue, otherwise subscription in ngOnInit fails and throws an error.
    el = fixture.nativeElement;
  });

  it('should create', () => {
    (<any>guardianNewsService).getWidgetNews.and.returnValue(asyncData(newsItemsArray));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows three news items', async(() => {
    (<any>guardianNewsService).getWidgetNews.and.returnValue(asyncData(newsItemsArray));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const items = el.querySelectorAll('li');
      expect(items.length).toEqual(3);
      const item1 = items[0];
      const title = item1.querySelector('h3');
      const trailText = item1.querySelector('span');
      expect((<HTMLHeadingElement>title).textContent).toBe('stub title');
      expect((<HTMLElement>trailText).textContent).toBe('stub trail text');
    });
  }));

  it('displays an error message when GuardianNewsService fails', async(() => {
    (<any>guardianNewsService).getWidgetNews.and.returnValue(asyncError({ error: 'GuardianNewsService test failure' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));
});
