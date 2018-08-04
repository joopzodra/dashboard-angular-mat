import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '../../app.material-module';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  const stubActivatedRoute: any = {
    snapshot: { data: 'test' }
  };
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
      providers: [
        { provide: ActivatedRoute, useValue: stubActivatedRoute }
      ]
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
