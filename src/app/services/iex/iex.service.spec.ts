import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IexService } from './iex.service';
import { IexDayItem, IexLongtermItem } from '../../models/iex-items';
import { stubIexDayItems, stubIexLongtermItem} from '../../testing/stub-iex-data';

describe('IexService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: IexService;
  const baseUrl = environment.backendBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IexService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(IexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('its getWidgetData method returns an observable of an array IexDayItems', () => {
    service.getWidgetData()
      .subscribe((res: IexDayItem[]) => {
        expect(res).toEqual(stubIexDayItems);
      });
    const req = httpTestingController.expectOne(baseUrl + '/iex?company=widget');
    expect(req.request.method).toEqual('GET');
    req.flush(stubIexDayItems);
  });

  it('its getDayData method pushes an array of IexDayItems in the service\'s iexDayData$ stream', () => {
    service.getDayData();
    const req = httpTestingController.expectOne(baseUrl + '/iex?company=all');
    expect(req.request.method).toEqual('GET');
    req.flush(stubIexDayItems);
    service.iexDayData$.subscribe(res => {
      expect(res).toBe(stubIexDayItems);
    });
  });

  it('its getLongtermData method pushes a IexLongtermItem in the service\'s iexLongtermData$ stream', () => {
    service.getLongtermData('AAAA');
    const req = httpTestingController.expectOne(baseUrl + '/iex?company=AAAA');
    expect(req.request.method).toEqual('GET');
    req.flush(stubIexLongtermItem);
    service.iexLongtermData$.subscribe(res => {
      expect(res).toBe(stubIexLongtermItem);
    });
  });
});
