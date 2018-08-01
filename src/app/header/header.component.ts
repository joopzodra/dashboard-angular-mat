import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

import { Breakpoints } from '../models/breakpoints';
import { BreakpointsService } from '../services/breakpoints/breakpoints.service';

/*
 * The HeaderComponent is a child component of the AppComponent.
 * It shows the app title and the current date.
 * It is clickable to navigate to the dashboard component, with a pointer cursor on hover. However, the cursor is not a pointer if the app already showing the dashboard component.
 */

@Component({
  selector: 'jr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleEvent: EventEmitter<boolean>;
  monthDict = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  date = new Date()
  day = this.date.getDate();
  month = this.monthDict[this.date.getMonth()];
  year = this.date.getFullYear();
  cursor = 'auto';
  mediaLarge = false;

  constructor(private router: Router, private breakpointsService: BreakpointsService) {
    breakpointsService.breakpoints$.subscribe(value => {
      this.mediaLarge = value.large;
    })
    this.toggleEvent = new EventEmitter()
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      )
    .subscribe(event => {
      this.cursor = (<NavigationEnd>event).url === '/overzicht' ? 'auto' : 'pointer';
    })
  }

  toggleSidenav() {
    this.toggleEvent.emit(true);
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
