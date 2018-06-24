import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NosNewsService } from './nos-news.service';

describe('NosNewsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: NosNewsService;
  const url = 'http://localhost:8000/dashboard/nos-news';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NosNewsService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(NosNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('its getNews method does the expected get-request', () => {
    const testResponse = { name: 'test-response' };
    service.getNews().subscribe(response => {
      expect(response).toEqual(testResponse);
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(testResponse);
    httpTestingController.verify();
  })
});
