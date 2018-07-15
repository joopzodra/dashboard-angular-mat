import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

import { AppMaterialModule } from '../app.material-module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let expectedBreakpoints = new Subject<boolean[]>();
  let headerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [AppMaterialModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.breakpoints = expectedBreakpoints;
    fixture.detectChanges();
    headerEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nav button is shown on small and medium screens but not on large screens', () => {
    const button = headerEl.querySelector('button')
    expect(button).toBeDefined()
    expectedBreakpoints.subscribe(() => {
      fixture.detectChanges();
      const button = headerEl.querySelector('button');
      expect(button).toBeNull();
    });
    expectedBreakpoints.next([true, true]);
  });

  it('clicking the nav button emits a toggle sidenav event', () => {
    const buttonDe = fixture.debugElement.query(By.css('button'));
    component.toggleEvent.subscribe((ev: boolean) => {
      expect(ev).toBeTruthy();
    })
    buttonDe.triggerEventHandler('click', true);
  });
});
