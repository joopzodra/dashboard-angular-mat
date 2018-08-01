import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { IexPageComponent } from './iex-page.component';
import { AppMaterialModule } from '../../app.material-module';
import { DateIsoPipe } from '../../pipes/date-iso.pipe';
import { IexService } from '../../services/iex/iex.service';
import { IexDayItem, IexLongtermItem } from '../../models/iex-items';
import { stubIexDayItems, stubIexLongtermItem } from '../../testing/stub-iex-data';

describe('IexPageComponent', () => {
  let component: IexPageComponent;
  let fixture: ComponentFixture<IexPageComponent>;
  let el: HTMLElement;
  let de: DebugElement;
  let iexService: IexService;

  class stubIexService {
    iexDayData$ = new BehaviorSubject<IexDayItem[]>(stubIexDayItems);
    iexLongtermData$ = new BehaviorSubject<IexLongtermItem[]>([stubIexLongtermItem]);
    getDayData() { }
    getLongtermData(companySymbol: string) { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule],
      declarations: [IexPageComponent, DateIsoPipe],
      providers: [{ provide: IexService, useClass: stubIexService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IexPageComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    de = fixture.debugElement;
    iexService = TestBed.get(IexService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays Angular Material cards for the expected number of companies', async(() => {
    fixture.whenStable().then(() => {
      const companyCards = el.querySelectorAll('#all-companies-container mat-card');
      expect(companyCards.length).toBe(2);
      const cardTitle = companyCards[0].querySelector('.company-header');
      expect((<HTMLElement>cardTitle).textContent).toBe('AAAA – Aaaa');
    });
  }));

  it('has an selected company and passes the corresponding data to the IexChart components', async(() => {
    fixture.whenStable().then(() => {
      expect(component.iexSelectedCompanyDayItem).toBeTruthy();
      expect(component.iexSelectedCompanyLongtermItem).toBeTruthy();
    });
  }));

  it('on clicking on a company, this company becomes the selected company', async(() => {
    const spy = spyOn((<any>component).iexService, 'getLongtermData');
    fixture.whenStable().then(() => {
      const secondCompanyCard = de.queryAll(By.css('#all-companies-container li'))[1];
      secondCompanyCard.triggerEventHandler('click', null);
      expect(component.iexSelectedCompanyDayItem).toBe(stubIexDayItems[1]);
      expect(spy).toHaveBeenCalledWith(stubIexDayItems[1].day.symbol);
    });
  }));

  it('displays an error message when IexService fails', async(() => {
    const err = <HttpErrorResponse>{ error: 'an error' }
    iexService.iexDayData$.next(err);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errMessage = el.querySelector('.error-message');
      expect((<HTMLElement>errMessage).textContent).toMatch('an error');
      component.errorMessage = '';
      return true;
    })
      .then(() => {
        iexService.iexLongtermData$.next(err);
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const errMessage = el.querySelector('.error-message');
          expect((<HTMLElement>errMessage).textContent).toMatch('an error');
        });
      });
  }));

});
