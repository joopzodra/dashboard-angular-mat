import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppMaterialModule } from '../../../../app.material-module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'

import { asyncData, asyncError } from '../../../../testing/async-observable-helpers';
import { OpenweathermapWidgetComponent } from './openweathermap-widget.component';
import { OpenweathermapDataService } from '../../../../services/openweathermap-data/openweathermap-data.service';
import { stubOpenweathermapItem, anotherStubOpenweathermapItem } from '../../../../testing/stub-openweathermap-item';

describe('OpenweathermapWidgetComponent', () => {
  let component: OpenweathermapWidgetComponent;
  let fixture: ComponentFixture<OpenweathermapWidgetComponent>;
  let el: HTMLElement;
  let openweathermapDataService: OpenweathermapDataService;
  class MockOpenweathermapDataService {
    getWidgetWeather() { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [OpenweathermapWidgetComponent],
      providers: [{ provide: OpenweathermapDataService, useClass: MockOpenweathermapDataService }]
    });

    fixture = TestBed.createComponent(OpenweathermapWidgetComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    openweathermapDataService = TestBed.get(OpenweathermapDataService);

    //fixture.detectChanges(); // Don't call this without providing spy with returnValue, otherwise subscription in ngOnInit fails and throws an error.
  });

  afterAll(() => {
    document.cookie = 'dashboardMdOpenweathermapCity=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  })

  it('should create', () => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows the current weather', async(() => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const currentWeatherDiv = el.querySelector('#current-weather');
      expect(currentWeatherDiv).toBeTruthy();
      const cityName = (<HTMLHeadingElement>currentWeatherDiv).querySelector('.city-name');
      const description = (<HTMLHeadingElement>currentWeatherDiv).querySelector('.description');
      expect((<HTMLHeadingElement>cityName).textContent).toBe('city');
      expect((<HTMLElement>description).textContent).toBe('current weather description');
    });
  }));

  it('shows a forecast', async(() => {
    const forecastItemsLength = stubOpenweathermapItem.forecast.data.length;
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
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

  it('displays an error message when OpenweathermapDataService fails', async(() => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncError({ error: 'OpenweathermapDataService test failure' }));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));

  it('has an select menu to select a city', async(() => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    openweathermapDataService.cityNames$ = of(['city1', 'city2']);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const formField = el.querySelector('mat-form-field');
      expect(formField).toBeTruthy();
    });
  }));

  it('doesn\'t show the select menu if there\'s an error in receiving the cities list from the backend', async(() => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    openweathermapDataService.cityNames$ = of([]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const formField = el.querySelector('mat-form-field');
      expect(formField).toBeFalsy();
    });
  }));

  it('on selecting another city, it shows weather data of the selected city', async(() => {
    const spy = spyOn(openweathermapDataService, 'getWidgetWeather').and.returnValue(asyncData(stubOpenweathermapItem));
    openweathermapDataService.cityNames$ = of(['city1', 'city2']);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      spy.and.returnValue(asyncData(anotherStubOpenweathermapItem));
      component.cityChanged((<any>{ value: anotherStubOpenweathermapItem.city }));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const cityName = el.querySelector('.city-name');
        expect((<HTMLElement>cityName).textContent).toBe('city');        
      })
    });
  }));

});
