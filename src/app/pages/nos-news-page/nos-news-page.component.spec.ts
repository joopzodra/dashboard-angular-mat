import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { NosNewsPageComponent } from './nos-news-page.component';
import { AppMaterialModule } from '../../app.material-module'
import { NosNewsService } from '../../services/nos-news/nos-news.service';
import { asyncData, asyncError } from '../../testing/async-observable-helpers';
import { newsItemsArray } from '../../testing/stub-news-items';
import { NewsItem } from '../../models/news-item';

describe('NosNewsPageComponent', () => {
  let component: NosNewsPageComponent;
  let fixture: ComponentFixture<NosNewsPageComponent>;
  let nosNewsService: jasmine.SpyObj<Observable<NewsItem[]>>;
  let el: HTMLElement;

  beforeEach(() => {
    nosNewsService = jasmine.createSpyObj('NosNewsService', ['getPageNews']);
    (<any>nosNewsService).getPageNews.and.returnValue(asyncData(newsItemsArray));
        TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [ NosNewsPageComponent ],
      providers: [{ provide: NosNewsService, useValue: nosNewsService }]      
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosNewsPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
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
      expect((<HTMLHeadingElement>title).textContent).toBe('stub title');
      expect((<HTMLElement>trailText).textContent).toBe('stub trail text');
    });
  }));

  it('displays an error message when GuardianNewsService fails', async(() => {
    (<any>nosNewsService).getPageNews.and.returnValue(asyncError({ error: 'GuardianNewsService test failure' }));
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));
});
