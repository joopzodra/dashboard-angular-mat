import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app.material-module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';
import { OpenweathermapPageComponent } from './openweathermap-page.component';
import { OpenweathermapDataService } from '../../services/openweathermap-data/openweathermap-data.service';
import { stubOpenweathermapItem, anotherStubOpenweathermapItem } from '../../testing/stub-openweathermap-item';

describe('OpenweathermapPageComponent', () => {

  const stubActivatedRoute: any = {
    snapshot: { data: 'test' }
  };

  let component: OpenweathermapPageComponent;
  let fixture: ComponentFixture<OpenweathermapPageComponent>;
  let serviceSpy: jasmine.SpyObj<any>;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj('OpenweathermapDataService', ['getPageWeather']);
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [OpenweathermapPageComponent],
      providers: [
        { provide: OpenweathermapDataService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: stubActivatedRoute }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenweathermapPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    de = fixture.debugElement;
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

  it('displays an error message when OpenweathermapDataService fails', async(() => {
    serviceSpy.getPageWeather.and.returnValue(asyncError({ error: 'OpenweathermapDataService test failure' }));
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch(/test failure/);
    });
  }));

  it('on clicking on an news item, this item becomes the selected news item', async(() => {
    serviceSpy.getPageWeather.and.returnValue(asyncData([stubOpenweathermapItem, anotherStubOpenweathermapItem]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.selectedCity = stubOpenweathermapItem;
      fixture.detectChanges();
      let selectedItem = el.querySelector('#selected-city-container .city-name');
      expect((<HTMLElement>selectedItem).textContent).toBe('city');
      const newsItem2 = de.queryAll(By.css('#all-cities-container li'))[1];
      newsItem2.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect((<HTMLElement>selectedItem).textContent).toBe('another city');
    });
  }));

});
