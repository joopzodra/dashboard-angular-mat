import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppMaterialModule } from '../../../app.material-module';
import { of } from 'rxjs';

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
      imports: [AppMaterialModule],
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

  it('shows a weather item', async(() => {
    // use a stub image, otherwise XHR-request to localhost:8000, which causes CORS errors
    // don't forget to set path to assets-for-testing in angular.json  
    component.iconToIconUrl = () => 'assets-for-testing/stub-image.jpg';
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

  it('displays an error message when OpenweathermapService fails', async(() => {
    const spy = spyOn(openweathermapService, 'getWidgetWeather').and.returnValue(asyncError({error: 'OpenweathermapService test failure'}));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }))
});
