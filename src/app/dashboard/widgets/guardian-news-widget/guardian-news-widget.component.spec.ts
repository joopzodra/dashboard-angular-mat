import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module'
import { GuardianNewsService } from '../../../services/guardian-news/guardian-news.service';
import { GuardianNewsWidgetComponent } from './guardian-news-widget.component';
import { MockGuardianNewsService } from '../../../testing/mock-guardian-news.service';

describe('GuardianNewsComponent', () => {
  let component: GuardianNewsWidgetComponent;
  let fixture: ComponentFixture<GuardianNewsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuardianNewsWidgetComponent],
      imports: [AppMaterialModule],
      providers: [
        {provide: GuardianNewsService, useClass: MockGuardianNewsService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianNewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.getNews();
    fixture.detectChanges();
    console.log(component.items)
    expect(component).toBeTruthy();
  });
});
