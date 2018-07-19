import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Breakpoints } from '../../models/breakpoints';
/*
 * The BreakpointService has a BreakpointObserver injected.
 * The BreakpointObserver is part of the Angular Material component dev kit (CDK). It is a utility for evaluating media queries and reacting to their changing.
 * The BreakpointService exposes three breakpoints: small, medium and large screen.
 */

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  breakpoints$: Observable<Breakpoints>;

  // breakpoint at which the height of mat-toolbar in the HeaderComponent changes:
  private breakpointTablet = '(min-width: 600px)'
  // breakpoint usefull for responsive design
  private breakpointMedium = '(min-width: 960px)';
  private breakpointLarge = '(min-width: 1440px)';

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpoints$ = breakpointObserver.observe([this.breakpointTablet, this.breakpointMedium, this.breakpointLarge])
      .pipe(
        map(() => ({ tablet: breakpointObserver.isMatched(this.breakpointTablet), medium: breakpointObserver.isMatched(this.breakpointMedium), large: breakpointObserver.isMatched(this.breakpointLarge) }))
      )
  };
}
