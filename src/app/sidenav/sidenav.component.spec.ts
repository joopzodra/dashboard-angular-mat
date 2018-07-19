import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../app.material-module';
import { SidenavComponent } from './sidenav.component';
import { Breakpoints } from '../models/breakpoints';
import { BreakpointsService } from '../services/breakpoints/breakpoints.service';

describe('SidenavComponent', () => {

  class StubBreakpointsService {
    breakpoints$ = new Subject<Breakpoints>();
  }

  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let breakpointService: BreakpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent
      ],
      imports: [AppMaterialModule, BrowserAnimationsModule],
      providers: [{ provide: BreakpointsService, useClass: StubBreakpointsService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    breakpointService = TestBed.get(BreakpointsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sidenav is opened on large screens and closed on tablet and medium screens', () => {
    const sidenav = component.sidenav;
    (<any>breakpointService.breakpoints$).next({ tablet: false, medium: false, large: false });
    fixture.detectChanges();
    expect(sidenav.opened).toBeFalsy();
    (<any>breakpointService.breakpoints$).next({ tablet: true, medium: true, large: false });
    fixture.detectChanges();
    expect(sidenav.opened).toBeFalsy();
    (<any>breakpointService.breakpoints$).next({ tablet: true, medium: true, large: true });
    fixture.detectChanges();
    expect(sidenav.opened).toBeTruthy();
  });
});