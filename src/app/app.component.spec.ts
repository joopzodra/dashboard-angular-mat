import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import  { Observable } from 'rxjs';

import { AppComponent } from './app.component';

@Component({selector: 'jr-header', template: ''})
class HeaderStubComponent {@Input() 'breakpoints': Observable<boolean[]>}

@Component({selector: 'jr-sidenav', template: ''})
class SidenavStubComponent {@Input() 'breakpoints': Observable<boolean[]>}

@Component({selector: 'jr-dashboard', template: ''})
class DashboardStubComponent {@Input() 'breakpoints': Observable<boolean[]>}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderStubComponent,
        RouterOutletStubComponent,
        SidenavStubComponent,
        DashboardStubComponent
      ]      
    });
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
