import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { Breakpoints } from '../models/breakpoints';
import { BreakpointsService } from '../services/breakpoints/breakpoints.service';

/*
 * The SidenavComponent is a child component of the AppComponent.
 * Depending on the screen width, the sidenav is opened or closed. On large screens it's opened. On small and medium screens it's closed and can its opening and closing can be toggled.
 * The toggle method is called in the AppComponent's template (on a toggleEvent, fired by clicking the HeaderComponent's nav button). 
 */

@Component({
  selector: 'jr-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  mode = 'over';
  // topGap is equal to height of mat-toolbar in HeaderComponent, which is changing at the 600px breakpoint
  topGap = 56;
  breakpoints$: Observable<Breakpoints>;

  navItems = [
    { url: '/overzicht', label: 'Overzicht' },
    { url: '/paginas/nieuws', label: 'Nieuws' },
    { url: '/paginas/tech-nieuws', label: 'Tech nieuws' },
    { url: '/paginas/weer', label: 'Weer' },
    { url: 'paginas/tech-aandelen', label: 'Tech aandelen'}
  ]

  constructor(breakpointsService: BreakpointsService) {
    this.breakpoints$ = breakpointsService.breakpoints$;
  }

  ngOnInit() {
    this.breakpoints$.subscribe(value => {
      if (value.large) {
        this.sidenav.open();
        this.mode = 'side';
      } else {
        this.sidenav.close();
        this.mode = 'over';
      }
      this.topGap = value.tablet ? 64 : 56;
    });
  }

  toggle() {
    this.sidenav.toggle();
  }

  close() {
    if (this.mode === 'over') {
      this.sidenav.close();
    }
  }
}
