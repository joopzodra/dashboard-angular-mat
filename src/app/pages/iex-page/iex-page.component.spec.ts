import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'

import { IexPageComponent } from './iex-page.component';
import { ChartsModule } from '../../charts/charts.module';
import { AppMaterialModule } from '../../app.material-module';
import { DateIsoPipe } from '../../pipes/date-iso.pipe';
import { IexService } from '../../services/iex/iex.service';
import { IexDayItem, IexLongtermItem } from '../../models/iex-items';

describe('IexPageComponent', () => {
  let component: IexPageComponent;
  let fixture: ComponentFixture<IexPageComponent>;

  class stubIexService {
    iexDayData$ = new BehaviorSubject<IexDayItem[]>([]);
    iexLongtermData$ = new BehaviorSubject<IexLongtermItem[]>([]);

    getDayData() {}
    getLongTermData(companySymbol: string) {}

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule, AppMaterialModule, RouterTestingModule],
      declarations: [IexPageComponent, DateIsoPipe],
      providers: [{provide: IexService, useClass: stubIexService}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
