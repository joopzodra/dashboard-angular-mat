import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
registerLocaleData(localeNl);

import { AppMaterialModule } from '../../../app.material-module';
import { IexWidgetComponent } from './iex-widget.component';
import { IexChartComponent } from '../../../charts/iex-chart/iex-chart.component';
import { IexService } from '../../../services/iex-service/iex.service';
import { IexDayItem, IexLongtermItem } from '../../../models/iex-items';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';
import { stubIexDayItem } from '../../../testing/stub-iex-data';
import { DateIsoPipe } from '../../../pipes/date-iso.pipe';

describe('IexWidgetComponent', () => {
  let component: IexWidgetComponent;
  let fixture: ComponentFixture<IexWidgetComponent>;
  let el: HTMLElement;
  let de: DebugElement;
  let iexService: jasmine.SpyObj<{}>;
  let routerSpy: jasmine.SpyObj<{}>;
  const stubData = Array(3).fill(Object.assign({}, stubIexDayItem));

  beforeEach(() => {
    iexService = jasmine.createSpyObj('IexService', ['getWidgetData']);
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [IexWidgetComponent, IexChartComponent, DateIsoPipe],
      providers: [
        { provide: IexService, useValue: iexService },
        { provide: Router, useValue: routerSpy }
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IexWidgetComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    el = fixture.nativeElement;
    de = fixture.debugElement;
  });

  it('should create', () => {
    (<any>iexService).getWidgetData.and.returnValue(asyncData(stubData));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('displays stock data', async(() => {
    (<any>iexService).getWidgetData.and.returnValue(asyncData(stubData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const companySymbol = el.querySelector('.company-symbol') as Element;
      expect(companySymbol.textContent).toBe('AAAA');
      const price = el.querySelector('.quote-info-top-right') as Element;
      expect(price.textContent).toBe('$ 217,50');
    });
  }));

  it('passes stock data to the iex-chart-component', () => {
    (<any>iexService).getWidgetData.and.returnValue(asyncData(stubData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.companyData.subscribe(data => {
        expect(data[0]).toEqual(stubIexDayItem);
      })
    });
  });
});
