import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../../../app.material-module';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { NosNewsWidgetComponent } from './nos-news-widget.component';
import { NewsItem } from '../../../models/news-item';

fdescribe('NosNewsWidgetComponent', () => {
  let component: NosNewsWidgetComponent;
  let fixture: ComponentFixture<NosNewsWidgetComponent>;
  let el: HTMLElement;
  let nosNewsService: jasmine.SpyObj<{}>;

  const newsItem: NewsItem = {
    title: 'stub title',
    trailText: 'stub trail text',
    thumbnail: '',
    body: 'stub body text'
  }
  const newsItemsArray = Array(3).fill(newsItem);

  beforeEach(() => {
    nosNewsService = jasmine.createSpyObj('NosNewsService', ['getWidgetNews']);

    TestBed.configureTestingModule({
      declarations: [NosNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: NosNewsService, useValue: nosNewsService }
      ]
    });

    fixture = TestBed.createComponent(NosNewsWidgetComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // Don't call this without providing spy with returnValue, otherwise subscription in ngOnInit fails and throws an error.
    el = fixture.nativeElement;
  });

  it('should create', () => {
    (<any>nosNewsService).getWidgetNews.and.returnValue(asyncData(newsItemsArray));
    fixture.detectChanges();    expect(component).toBeTruthy();
  });

  it('shows three news items', async(() => {
    (<any>nosNewsService).getWidgetNews.and.returnValue(asyncData(newsItemsArray));
    fixture.detectChanges();    fixture.whenStable().then(() => {
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
    (<any>nosNewsService).getWidgetNews.and.returnValue(asyncError({ error: 'NosNewsService test failure' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));
});
