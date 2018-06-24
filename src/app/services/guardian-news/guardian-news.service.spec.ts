import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GuardianNewsService } from './guardian-news.service';
import { of } from 'rxjs';

describe('GuardianNewsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: GuardianNewsService;
  const baseUrl = 'http://localhost:8000/dashboard';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardianNewsService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new GuardianNewsService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('its getNews method does the expected get-request', () => {
    const guardianNewsResponse: any = {
      response: {
        results: Array(3).fill('http://test')
      }
    };
    const singleResponse = { name: 'test-response' }
    const singleResponses = Array(3).fill(singleResponse);
    const spy = spyOn(service, 'getSingle').and.returnValue(
      of(singleResponse)
    );
    service.getNews()
      .subscribe(response => {
        expect(response).toEqual(singleResponses);
        expect(service.getSingle).toHaveBeenCalled();
      });
    const req = httpTestingController.expectOne(baseUrl + '/guardian-news?section=technology&page-size=3');
    expect(req.request.method).toEqual('GET');
    req.flush(guardianNewsResponse);
    httpTestingController.verify();
  });

  it('its getSingle method does the expected get-request', () => {
    const testSingleUrl = 'https://test-url';
    const testResponse = { name: 'test-response' };
    service.getSingle(testSingleUrl)
      .subscribe(response => {
        expect(response).toEqual(testResponse);
      });
    const req = httpTestingController.expectOne(`${baseUrl}/guardian-single?single-url=${testSingleUrl}&show-fields=trailText,thumbnail`);
    expect(req.request.method).toEqual('GET');
    req.flush(testResponse);
    httpTestingController.verify();
  });
});
