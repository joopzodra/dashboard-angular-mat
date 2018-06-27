import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app.material-module';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

@Component({ selector: 'jr-guardian-news-widget', template: '' })
class GuardianStubComponent { }
@Component({ selector: 'jr-nos-news-widget', template: '' })
class NosStubComponent { }
@Component({ selector: 'jr-openweathermap-widget', template: '' })
class OpenWeathermapStubComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let expectedBreakpoints: Observable<boolean[]>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        GuardianStubComponent,
        NosStubComponent,
        OpenWeathermapStubComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    expectedBreakpoints = of([true, true]);
    component.breakpoints = expectedBreakpoints;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
