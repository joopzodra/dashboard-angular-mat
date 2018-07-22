import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app.material-module';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@Component({ selector: 'jr-guardian-news-widget', template: '' })
class GuardianStubComponent { }
@Component({ selector: 'jr-nos-news-widget', template: '' })
class NosStubComponent { }
@Component({ selector: 'jr-openweathermap-widget', template: '' })
class OpenWeathermapStubComponent { }

describe('DashboardComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        GuardianStubComponent,
        NosStubComponent,
        OpenWeathermapStubComponent
      ],
      providers:[{provide: Router, useValue: routerSpy}]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
