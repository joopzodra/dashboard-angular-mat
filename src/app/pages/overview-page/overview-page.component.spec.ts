import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app.material-module';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { OverviewPageComponent } from './overview-page.component';

@Component({ selector: 'jr-guardian-news-widget', template: '' })
class GuardianStubComponent { }
@Component({ selector: 'jr-nos-news-widget', template: '' })
class NosStubComponent { }
@Component({ selector: 'jr-openweathermap-widget', template: '' })
class OpenWeathermapStubComponent { }
@Component({ selector: 'jr-iex-widget', template: '' })
class IexStubComponent { }

describe('OverviewPageComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewPageComponent,
        GuardianStubComponent,
        NosStubComponent,
        OpenWeathermapStubComponent,
        IexStubComponent
      ],
      providers:[{provide: Router, useValue: routerSpy}]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
