import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'jr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  breakpointMedium = '(min-width: 960px)';
  breakpointLarge = '(min-width: 1440px)'
  breakpoints: Observable<boolean[]>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpoints = breakpointObserver.observe([this.breakpointMedium, this.breakpointLarge ])
      .pipe(
        map(() => [breakpointObserver.isMatched(this.breakpointMedium), breakpointObserver.isMatched(this.breakpointLarge)])
      )
  };
}
