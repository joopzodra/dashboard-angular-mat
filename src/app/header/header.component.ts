import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import {filter } from 'rxjs/operators';

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
  mediaSmall = true;
  headerStyle = {};
  headerNameStyle = {};
  headerDateStyle = {};
  currentRoute = '';

  constructor( private breakpointsService: BreakpointsService, private router: Router) {
    this.toggleEvent = new EventEmitter()
  }

  ngOnInit() {

    this.breakpointsService.breakpoints$.subscribe(value => {
      this.mediaSmall = !value.tablet;
      this.mediaLarge = value.large;

      if (this.mediaSmall) {
        this.headerStyle = {
          'flex-direction': 'column',
          'margin-top': '6px'
        };
        this.headerNameStyle = {
          'font-size': '0.9em',
          'margin-bottom': '-10px'
        };
        this.headerDateStyle = {
          'font-size': '0.7em'
        }
      } else {
        this.headerStyle = {
          'justify-content': 'center'
        };
        this.headerNameStyle = {
          'font-weight': 'bold'
        };
        this.headerDateStyle = {
          'margin-left': '24px'
        };
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      )
    .subscribe(event => {
       const url = (<NavigationEnd>event).url.split('#')[0];
       this.currentRoute = url;
    })
  }

  toggleSidenav() {
    this.toggleEvent.emit(true);
  }

  toFrontendJr() {
    location.href = 'https://frontendJR.nl';
  }

  focusContent() {
    (document.querySelector('#content') as HTMLElement).focus();
  }

}
