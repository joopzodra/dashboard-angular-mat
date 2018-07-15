import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../../../app.material-module';
import { asyncData } from '../../../testing/async-observable-helpers';
import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { NosNewsWidgetComponent } from './nos-news-widget.component';
import { NewsItem } from '../../../models/news-item';

describe('NosNewsWidgetComponent', () => {
  let component: NosNewsWidgetComponent;
  let fixture: ComponentFixture<NosNewsWidgetComponent>;
  let el: HTMLElement;

  const newsItem: NewsItem = {
    title: 'stub title',
    trailText: 'stub trail text',
    thumbnail: '',
    body: 'stub body text'
  }
  const newsItemsArray = Array(3).fill(newsItem);

  beforeEach(() => {
    const nosNewsService = jasmine.createSpyObj('NosNewsService', ['getWidgetNews']);
    const getWidgetNewsSpy = nosNewsService.getWidgetNews.and.returnValue(asyncData(newsItemsArray));

    TestBed.configureTestingModule({
      declarations: [NosNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: NosNewsService, useValue: nosNewsService }
      ]
    });

    fixture = TestBed.createComponent(NosNewsWidgetComponent);
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
