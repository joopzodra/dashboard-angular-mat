import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IexService } from './iex.service';

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
  });

  it('should be created', inject([IexService], (service: IexService) => {
    expect(service).toBeTruthy();
  }));
});
