import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppMaterialModule } from '../../../app.material-module';
import { IexWidgetComponent } from './iex-widget.component';
import { IexService } from '../../../services/iex-service/iex.service';
import { IexDayItem, IexLongtermItem } from '../../../models/iex-items';
import { asyncData, asyncError } from '../../../testing/async-observable-helpers';

describe('IexWidgetComponent', () => {
  let component: IexWidgetComponent;
  let fixture: ComponentFixture<IexWidgetComponent>;
  let el: HTMLElement;
  let iexService: jasmine.SpyObj<{}>;
  let routerSpy: jasmine.SpyObj<{}>;

  const iexDayItemStub = {
    companySymbol: 'AAAA',
    quote: {
      company_name: 'aaaa',
      latest_update: 0,
      latest_price: 100
    },
    day: [{
      symbol: 'AAAA',
      chart_data: {
        date: '20180101',
        time: '09:30',
        price: 100
      }
    }]
  }

  beforeEach(() => {
    iexService = jasmine.createSpyObj('IexService', ['getWidgetData']);
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [IexWidgetComponent],
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
  });

  it('should create', () => {
    (<any>iexService).getWidgetData.and.returnValue(asyncData(iexDayItemStub));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
