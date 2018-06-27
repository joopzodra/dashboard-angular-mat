import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../app.material-module';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let expectedBreakpoints = new Subject<boolean[]>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [AppMaterialModule, BrowserAnimationsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    component.breakpoints = expectedBreakpoints;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sidenav is opened on large screens and closed on small and medium screens', () => {
    const sidenav = component.sidenav;
    expectedBreakpoints.subscribe(value => {
      if (!value[1]) {
        expect(sidenav.opened).toBeFalsy();
      }
      if (value[1]) {
        expect(sidenav.opened).toBeTruthy();
      }
    });
    expectedBreakpoints.next([false, false]);
    expectedBreakpoints.next([true, true]);
  });
});
