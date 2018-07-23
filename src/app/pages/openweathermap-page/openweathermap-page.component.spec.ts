import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';
import { OpenweathermapPageComponent } from './openweathermap-page.component';
import { OpenweathermapService } from '../../services/openweathermap/openweathermap.service';
import { stubOpenweathermapItem } from '../../testing/stub-openweathermap-item';

describe('OpenweathermapPageComponent', () => {
  let component: OpenweathermapPageComponent;
  let fixture: ComponentFixture<OpenweathermapPageComponent>;
  let serviceSpy: jasmine.SpyObj<any>;
  let el: HTMLElement;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj('OpenweathermapService', ['getPageWeather']);
    TestBed.configureTestingModule({
      declarations: [OpenweathermapPageComponent],
      providers: [{ provide: OpenweathermapService, useValue: serviceSpy }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenweathermapPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;

  });

  it('should create', () => {
    serviceSpy.getPageWeather.and.returnValue(asyncData([stubOpenweathermapItem, stubOpenweathermapItem]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows the expected number of items with city weatherdata', async(() => {
    serviceSpy.getPageWeather.and.returnValue(asyncData([stubOpenweathermapItem, stubOpenweathermapItem]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const items = el.querySelectorAll('li');
      expect(items.length).toBe(2);
    });
  }));

});
