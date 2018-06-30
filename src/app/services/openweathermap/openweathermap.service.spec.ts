import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment } from '../../../environments/environment';

import { OpenweathermapService } from './openweathermap.service';
import { OpenweathermapItem } from '../../models/openweathermap-item';
import { stubOpenweathermapItem } from '../../testing/stub-openweathermap-item';

describe('OpenweathermapService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: OpenweathermapService;
  const baseUrl = environment.backendBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenweathermapService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new OpenweathermapService(httpClient);
  });

  it('should be created', inject([OpenweathermapService], (service: OpenweathermapService) => {
    expect(service).toBeTruthy();
  }));

  it('its getWidgetWeather method returns an observable of an Openweathermap item', () => {
    service.getWidgetWeather('test')
      .subscribe((res: OpenweathermapItem) => {
        expect(res).toEqual(stubOpenweathermapItem);
      });
    const req = httpTestingController.expectOne(baseUrl + '/openweathermap?city=test');
    expect(req.request.method).toEqual('GET');
    req.flush(stubOpenweathermapItem);
    httpTestingController.verify();
  });

  xit('its getPageWeather method returns an observable of an array of Openweathermap items', () => {
    const stubResponse = Array(20).fill(stubOpenweathermapItem);
    service.getPageWeather()
      .subscribe(res => {
        expect(res).toEqual(stubResponse);
      });
/*    ????? const req = httpTestingController.expectOne(baseUrl + '/guardian-news?page-size=20&include-body=true');
    expect(req.request.method).toEqual('GET');*/
    req.flush(stubResponse);
    httpTestingController.verify();
  });

});
