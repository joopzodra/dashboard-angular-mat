import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../../../app.material-module'
import { asyncData } from '../../../testing/async-observable-helpers';
import { GuardianNewsService } from '../../../services/guardian-news/guardian-news.service';
import { GuardianNewsWidgetComponent } from './guardian-news-widget.component';
import { NewsItem } from '../../../models/news-item';

describe('GuardianNewsWidgetComponent', () => {
  let component: GuardianNewsWidgetComponent;
  let fixture: ComponentFixture<GuardianNewsWidgetComponent>;
  let el: HTMLElement;

  const newsItem: NewsItem = {
    title: 'stub title',
    trailText: 'stub trail text',
    thumbnail: '',
    body: 'stub body text'
  }
  const newsItemsArray = Array(3).fill(newsItem);

  beforeEach(() => {
    const guardianNewsService = jasmine.createSpyObj('GuardianNewsService', ['getWidgetNews']);
    const getWidgetNewsSpy = guardianNewsService.getWidgetNews.and.returnValue(asyncData(newsItemsArray));

    TestBed.configureTestingModule({
      declarations: [GuardianNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: GuardianNewsService, useValue: guardianNewsService }
      ]
    });

    fixture = TestBed.createComponent(GuardianNewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows three news items', async(() => {
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
});
