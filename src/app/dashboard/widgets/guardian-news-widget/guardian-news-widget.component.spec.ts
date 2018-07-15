import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module'

import { GuardianNewsService } from '../../../services/guardian-news/guardian-news.service';
import { MockGuardianNewsService } from '../../../testing/mock-guardian-news.service';
import { GuardianNewsWidgetComponent } from './guardian-news-widget.component';

describe('GuardianNewsWidgetComponent', () => {
  let component: GuardianNewsWidgetComponent;
  let fixture: ComponentFixture<GuardianNewsWidgetComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: GuardianNewsService, useClass: MockGuardianNewsService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianNewsWidgetComponent);
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
