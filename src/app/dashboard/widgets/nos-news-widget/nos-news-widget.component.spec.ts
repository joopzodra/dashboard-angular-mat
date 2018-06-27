import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module'

import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { MockNosNewsService } from '../../../testing/mock-nos-news.service';
import { NosNewsWidgetComponent } from './nos-news-widget.component';

describe('NosNewsWidgetComponent', () => {
  let component: NosNewsWidgetComponent;
  let fixture: ComponentFixture<NosNewsWidgetComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NosNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: NosNewsService, useClass: MockNosNewsService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosNewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows three news items', () => {
    const items = el.querySelectorAll('li');
    expect(items.length).toEqual(3);
    const item1 = items[0];
    const title = item1.querySelector('h3');
    const trailText = item1.querySelector('span');
    expect((<HTMLHeadingElement>title).textContent).toBe('stub title');
    expect((<HTMLElement>trailText).textContent).toBe('stub trail text');
  });
});
