import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { OpenweathermapWidgetComponent } from './openweathermap-widget.component';
import { OpenweathermapService } from '../../../services/openweathermap/openweathermap.service';
import { stubOpenweathermapItem } from '../../..//testing/stub-openweathermap-item';

describe('OpenweathermapWidgetComponent', () => {
  let component: OpenweathermapWidgetComponent;
  let fixture: ComponentFixture<OpenweathermapWidgetComponent>;
  let el: HTMLElement;
  let openweathermapService: OpenweathermapService;
  class MockOpenweathermapService {
    getWidgetWeather() { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule],
      declarations: [OpenweathermapWidgetComponent],
      providers: [{ provide: OpenweathermapService, useClass: MockOpenweathermapService }]
    });

    fixture = TestBed.createComponent(OpenweathermapWidgetComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    openweathermapService = TestBed.get(OpenweathermapService);

    //fixture.detectChanges(); // Don't call this without providing spy with returnValue, otherwise subscription in ngOnInit fails and throws an error.
  });

  it('should create', () => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows the current weather', async(() => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const currentWeatherDiv = el.querySelector('#current-weather');
      expect(currentWeatherDiv).toBeTruthy();
      const cityName = (<HTMLHeadingElement>currentWeatherDiv).querySelector('.city-name');
      const description = (<HTMLHeadingElement>currentWeatherDiv).querySelector('.description');
      expect((<HTMLHeadingElement>cityName).textContent).toBe('stub city name');
      expect((<HTMLElement>description).textContent).toBe('stub description 2');
    });
  }));

  it('shows a forecast', async(() => {
    const forecastItemsLength = stubOpenweathermapItem.forecast.data.length;
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const forecastItems = el.querySelectorAll('.forecast-item');
      expect(forecastItems.length).toBe(forecastItemsLength);
      const forecastItem = el.querySelector('.forecast-item');
      const temp = (<HTMLHeadingElement>forecastItem).querySelector('.temp');
      expect((<HTMLHeadingElement>temp).textContent).toBe('1°');
    });
  }));

  it('displays an error message when OpenweathermapService fails', async(() => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncError({ error: 'OpenweathermapService test failure' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));

  it('has an select menu to select a city', async(() => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    openweathermapService.cityNames$ = of(['city1', 'city2']);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const formField = el.querySelector('mat-form-field');
      expect(formField).toBeTruthy();
    });
  }));

  it('doesn\'t show the select menu if there\'s an error in receiving the cities list from the backend', () => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    openweathermapService.cityNames$ = of([]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const formField = el.querySelector('mat-form-field');
      expect(formField).toBeFalsy();
    });
  });
});
