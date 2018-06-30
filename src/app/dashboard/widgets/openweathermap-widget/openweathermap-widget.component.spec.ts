import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module';

import { OpenweathermapWidgetComponent } from './openweathermap-widget.component';
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';
import { MockOpenweatherService } from '../../../testing/mock-openweathermap.service';

describe('OpenweathermapWidgetComponent', () => {
  let component: OpenweathermapWidgetComponent;
  let fixture: ComponentFixture<OpenweathermapWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [OpenweathermapWidgetComponent],
      providers: [{ provide: OpenweathermapService, useClass: MockOpenweatherService }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenweathermapWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('shows a weather item', () => {

  });
});
