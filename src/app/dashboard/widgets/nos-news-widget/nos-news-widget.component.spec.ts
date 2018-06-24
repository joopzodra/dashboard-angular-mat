import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module'
import { NosNewsService } from '../../../services/nos-news/nos-news.service';
import { MockNosNewsService } from '../../../testing/mock-nos-news.service';

import { NosNewsWidgetComponent } from './nos-news-widget.component';

describe('NosNewsWidgetComponent', () => {
  let component: NosNewsWidgetComponent;
  let fixture: ComponentFixture<NosNewsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosNewsWidgetComponent ],
      imports: [AppMaterialModule],
      providers: [
        {provide: NosNewsService, useClass: MockNosNewsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosNewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
