import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Breakpoints } from '../models/breakpoints';
import { BreakpointsService } from '../services/breakpoints/breakpoints.service';

/*
 * The HeaderComponent is a child component of the AppComponent.
 * It shows the app title and the current date.
 */

@Component({
  selector: 'jr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  monthDict = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
  date = new Date()
  day = this.date.getDate();
  month = this.monthDict[this.date.getMonth()];
  year = this.date.getFullYear();

  mediaLarge = false;
  @Output() toggleEvent: EventEmitter<boolean>;

  constructor(breakpointsService: BreakpointsService) {
    breakpointsService.breakpoints$.subscribe(value => {
      this.mediaLarge = value.large;
    })
    this.toggleEvent = new EventEmitter()
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.toggleEvent.emit(true);
  }
}
